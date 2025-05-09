import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Request, UseGuards, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { CreateMarketplaceItemDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { MaterialsService } from './materials.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@ApiTags('materials')
@Controller('materials')
export class MaterialsController {
    constructor(private readonly materialsService: MaterialsService) { }

    @Post()
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FilesInterceptor('images', 10, {
      storage: diskStorage({
        destination: './uploads/marketplace',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + extname(file.originalname));
        }
      })
    }))
    @ApiOperation({ summary: 'Create a new material' })
    async create(
      @UploadedFiles() files: Express.Multer.File[],
      @Body() body: any,
      @Request() req
    ) {
      // Convert price to number and build images array
      const images = files.map(file => `/uploads/marketplace/${file.filename}`);
      const dto = {
        ...body,
        images,
        price: Number(body.price),
      };
      return this.materialsService.create(dto, req.user._id);
    }

    @Get()
    @ApiOperation({ summary: 'Get all materials' })
    async findAll(@Query() query: any) {
        return this.materialsService.findAll(query);
    }

    @Get('search')
    @ApiOperation({ summary: 'Search materials' })
    async search(@Query('q') query: string) {
        return this.materialsService.searchMaterials(query);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a material by ID' })
    async findOne(@Param('id') id: string) {
        return this.materialsService.findOne(id);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Update a material' })
    async update(
        @Param('id') id: string,
        @Body() updateMaterialDto: UpdateMaterialDto,
    ) {
        return this.materialsService.update(id, updateMaterialDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Delete a material' })
    async remove(@Param('id') id: string) {
        return this.materialsService.remove(id);
    }

    @Post(':id/purchase')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Purchase a material' })
    async purchase(@Param('id') id: string, @Request() req) {
        return this.materialsService.purchase(id, req.user._id);
    }

    @Patch(':id/approve')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @ApiOperation({ summary: 'Approve a material' })
    async approveMaterial(@Param('id') id: string) {
        return this.materialsService.approveMaterial(id);
    }

    @Get('seller/materials')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Get seller\'s materials' })
    async getSellerMaterials(@Request() req) {
        return this.materialsService.getSellerMaterials(req.user._id);
    }

    @Get('purchases/history')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Get user\'s purchase history' })
    async getPurchaseHistory(@Request() req) {
        return this.materialsService.getPurchaseHistory(req.user._id);
    }

    @Get('sales/history')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Get seller\'s sales history' })
    async getSalesHistory(@Request() req) {
        return this.materialsService.getSalesHistory(req.user._id);
    }

    @Patch('purchases/:id/status')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Update purchase status' })
    async updatePurchaseStatus(
        @Param('id') id: string,
        @Body('status') status: 'Pending' | 'Completed' | 'Failed' | 'Refunded',
        @Body('transactionId') transactionId?: string,
    ) {
        return this.materialsService.updatePurchaseStatus(id, status, transactionId);
    }
} 