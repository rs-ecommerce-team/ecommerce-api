import { Type } from 'class-transformer';
import {
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Matches,
  Max,
  Min,
} from 'class-validator';

const ALLOWED_SORT_FIELDS = [
  'id',
  'title',
  'price',
  'rating',
  'stock',
  'discountPercentage',
  'category',
  'brand',
] as const;

export type ProductSortField = (typeof ALLOWED_SORT_FIELDS)[number];

export class GetProductsQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(200)
  limit?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  skip?: number;

  @IsOptional()
  @IsString()
  @Matches(/^[a-zA-Z0-9_,]+$/, {
    message: 'select must be a comma-separated list of field names',
  })
  select?: string;

  @IsOptional()
  @IsIn(ALLOWED_SORT_FIELDS)
  sortBy?: ProductSortField;

  @IsOptional()
  @IsIn(['asc', 'desc'])
  order?: 'asc' | 'desc';
}
