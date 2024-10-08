import { ReviewModel } from "./review-model";

export class BookModel {
    id?: number;
    title?: string;
    author?: string;
    category?: string;
    summary?: string;
    categoryId?: string;
    reviews?: ReviewModel[];
}
