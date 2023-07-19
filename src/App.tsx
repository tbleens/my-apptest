import React, { ChangeEvent } from 'react';
import './App.css';

class TableList extends React.Component<any, any> {

  constructor(props: string[]) {
    super(props)
    this.state = { data: {}, limit: 30, skip: 0, nom: ''}
  }

  async componentDidMount() {
    const response = await fetch('https://dummyjson.com/products');
    const data = await response.json();
    this.setState({
      data:data.products
    })
    console.log(data)
    console.log(this.state)
  }

  onSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let url = 'https://dummyjson.com/products';
    let a=0;
    if(this.state.nom!=''){
      url+='/search?q='+this.state.nom
      a++
    }
    if(this.state.limit!=''){
      url+=a==0?'?limit='+this.state.limit:'&limit='+this.state.limit
    }
    
    // console.log(url, this.state.nom)
    const response = await fetch(url);
    const data = await response.json();
    this.setState({
      data:data.products
    })
    console.log(data)

  }

  onInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    // console.log(e.currentTarget.name, e.currentTarget.value)
    this.setState({
      [e.currentTarget.name]:e.currentTarget.value
    })
  }

  onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) =>{
    // console.log(e.currentTarget.name, e.currentTarget.value)
    this.setState({
      [e.currentTarget.name]:e.currentTarget.value
    })
  }

  paginate = async (skip : number)=>{

    let url = 'https://dummyjson.com/products';
    let a=0;
    if(this.state.nom!=''){
      url+='/search?q='+this.state.nom
      a++
    }
    if(this.state.limit!=''){
      url+=a==0?'?limit='+this.state.limit:'&limit='+this.state.limit
    }
    url+='&skip='+skip
    // console.log(url, this.state.nom)
    const response = await fetch(url);
    const data = await response.json();
    this.setState({
      data:data.products,
      skip:skip
    })
    console.log(data)
  }

  render() {
    // console.log(this.state.data.length)
    let table=""
    if(this.state.data.length){
      table=this.state.data.map((product: any)=>{
        return <tr>
            <td>{product.id}</td>
            <td>{product.title}</td>
            <td>{product.description}</td>
            <td>{product.brand}</td>
            <td>{product.category}</td>
            <td>{product.price}</td>
            <td>{product.discountPercentage}</td>
            <td>{product.stock}</td>
            <td><img src={product.thumbnail}  width={70}/></td>
            <td>{product.rating}</td>
          </tr>
      });

    }else{
      table=""
    }

    return <>
      <form onSubmit={this.onSubmit} style={{ float: "right", padding:"30px 45px 30px 45px" }}>
        <input type='text' name='nom' onChange={this.onInputChange} placeholder='entrer un nom pour la recherche'/>
        <select name='limit'onChange={this.onSelectChange}>
          <option value='1'>1</option>
          <option value='5'>5</option>
          <option value='10'>10</option>
          <option value='15'>15</option>
          <option value='30'>30</option>
        </select>
        <button type='submit'>send</button>
      </form>

      <table style={{padding:"30px 45px 30px 45px" }}>
        <thead>
          <tr>
            <th>id</th>
            <th>title</th>
            <th>description</th>
            <th>brand</th>
            <th>category</th>
            <th>Price</th>
            <th>discountPercentage</th>
            <th>stock</th>
            <th>thumbnail</th>
            <th>rating</th>
          </tr>
        </thead>
        <tbody>
          {table}
        </tbody>
      </table>
          <div className="pagination">
            <a href="#" onClick={()=>this.paginate(this.state.skip-this.state.limit)}>&laquo;</a>
            <a href="#" onClick={()=>this.paginate(this.state.limit+this.state.skip)}>&raquo;</a>
          </div>
    </>
  }
}


export default TableList;

