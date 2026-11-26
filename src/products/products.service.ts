import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import type { GetProductsQueryDto } from './dto/get-products-query.dto';
import type { SearchProductsQueryDto } from './dto/search-products-query.dto';
import type { Product, ProductsResponse } from './interfaces/product.interface';

@Injectable()
export class ProductsService {
  private readonly baseUrl = 'https://dummyjson.com';

  constructor(private readonly httpService: HttpService) {}

  async findAll(query: GetProductsQueryDto): Promise<ProductsResponse> {
    return this.fetchProducts<ProductsResponse>(this.baseUrl, query);
  }

  async search(query: SearchProductsQueryDto): Promise<ProductsResponse> {
    return this.fetchProducts<ProductsResponse>(
      `${this.baseUrl}/search`,
      query,
    );
  }

  async findByCategory(
    category: string,
    query: GetProductsQueryDto,
  ): Promise<ProductsResponse> {
    return this.fetchProducts<ProductsResponse>(
      `${this.baseUrl}/category/${encodeURIComponent(category)}`,
      query,
    );
  }

  async findOne(id: number): Promise<Product> {
    return this.fetchProducts<Product>(`${this.baseUrl}/${id}`);
  }

  private async fetchProducts<T>(url: string, params?: object): Promise<T> {
    const { data } = await firstValueFrom(
      this.httpService.get<T>(url, { params }).pipe(
        catchError((error: AxiosError) => {
          const status = error.response?.status ?? HttpStatus.BAD_GATEWAY;
          const message =
            (error.response?.data as { message?: string })?.message ??
            'Failed to fetch products from DummyJSON';
          throw new HttpException(message, status);
        }),
      ),
    );
    return data;
  }
}
