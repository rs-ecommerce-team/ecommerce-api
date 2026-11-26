import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { GetProductsQueryDto } from './dto/get-products-query.dto';
import { SearchProductsQueryDto } from './dto/search-products-query.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll(@Query() query: GetProductsQueryDto) {
    return this.productsService.findAll(query);
  }

  @Get('search')
  search(@Query() query: SearchProductsQueryDto) {
    return this.productsService.search(query);
  }

  @Get('category/:category')
  findByCategory(
    @Param('category') category: string,
    @Query() query: GetProductsQueryDto,
  ) {
    return this.productsService.findByCategory(category, query);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }
}
