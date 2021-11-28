class APIOpciones {
  constructor(query, queryReq) {
    this.query = query;
    this.queryReq = queryReq;
  }
  filtrar() {
    const excludeFields = ['sort', 'limit', 'fields', 'page'];
    let queryReqCopy = { ...this.queryReq };
    excludeFields.forEach((elem) => delete queryReqCopy[elem]);
    let queryString = JSON.stringify(queryReqCopy);
    queryString = queryString.replace(
      /\b(lt|lte|gt|gte)\b/g,
      (match) => `$${match}`
    );
    this.query = this.query.find(JSON.parse(queryString));
    return this;
  }
  ordenar() {
    if (this.queryReq.sort) {
      const sortBy = this.queryReq.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('apellido nombres');
    }
    return this;
  }
  limit() {
    if (this.queryReq.fields) {
      const campos = this.queryReq.fields.split(',').join(' ');
      this.query = this.query.select(campos);
    } else {
      this.query = this.query.select('-_id -__v');

      return this;
    }
  }
  paginar() {
    const pagina = this.queryReq.page ? this.queryReq.page * 1 : 1;
    const cantidad = this.queryReq.limit ? this.queryReq.limit * 1 : 10;
    const desde = (pagina - 1) * cantidad;
    this.query = this.query.skip(desde).limit(cantidad);

    return this;
  }
}

module.exports = APIOpciones;
