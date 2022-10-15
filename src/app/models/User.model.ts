export class User {
  constructor(
    public _id: string,
    public name?: string,
    public email?: string,
    public password?: string,
    public almacen?: string,
    public role?: string,
    public photo?: string,
    public google?: boolean,
    public active?: boolean
  ) {}
}
