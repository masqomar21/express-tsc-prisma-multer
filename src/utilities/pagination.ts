interface PaginationInterface {
    count: number
    rows: any[]
}

export class Pagination {
    readonly limit: number = 10
    readonly offset: number = 0
    readonly page: number = 1

    constructor(page: number, limit: number) {
        this.limit = limit
        this.page = page
        this.offset = (page - 1) * limit
    }

    paginate(data: PaginationInterface): any {
        return {
            total_item : data.count,
            item : data.rows,
            total_page : Math.ceil(data.count / this.limit),
            current_page : this.page !== 0 ? this.page : 0,
        }
    }
}