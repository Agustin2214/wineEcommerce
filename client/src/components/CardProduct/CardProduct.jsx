import React, {useEffect} from 'react';
import style from './CardProduct.module.css';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Link } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorites, allFavs, deleteFav } from '../../redux/actions/actions';

export const CardProduct = ({id, name, price, img, category, year, description, strain, producer, country}) => {
    const dispatch = useDispatch();
    let store = JSON.parse(localStorage.getItem('user'))
    // console.log(store.user.favorites)
    // console.log(id)
    const FavoritesState = useSelector(state=>state.favorites)
    // console.log(FavoritesState)
    // const chosenWine = FavoritesState.filter(wine=>wine.name===name)
    // console.log(chosenWine)
    useEffect(()=>{
      dispatch(allFavs(store.user.uid))
    },[dispatch])

    const handleDeleteFav = (id)=>{
      // console.log(id)
      const chosenWine1 = FavoritesState.filter(wine=>wine._id===id)
      // console.log(chosenWine)
      dispatch(deleteFav(id))
      if(chosenWine1.length!==0){
      alert('El vino seleccionado ha sido eliminado de tus favoritos')
      }
      else{
      alert('El vino seleccionado no forma parte de tus favoritos')
      }
    }
    const handleFavs = ()=>{
      // console.log("hola")
      const input={
        id: id,
        name: name,
        price: price,
        img: img,
        category: category,
        year: year,
        description: description,
        strain: strain,
        producer: producer,
        country: country
      }
      let arrayEmpty=[];
      let chosenWine2 = FavoritesState.filter(wine=>wine._id===id)
      dispatch(addFavorites(input))
      dispatch(allFavs(store.user.uid))
      // console.log(chosenWine)
      if(chosenWine2.length===0){
      alert('El vino seleccionado ha sido agregado a tus favoritos');
      chosenWine2=arrayEmpty;
      }
      else{
      alert('El vino seleccionado ya forma parte de tus favoritos');
      chosenWine2=arrayEmpty;
      }
    }

    const handleClickShopping = (id)=>{
        let state = JSON.parse(localStorage.getItem('ShoppingCar'));
        let sum = 0;
        let index = undefined;
    
        if(localStorage.id){
          console.log('asd')
        }
        if(state){
          for(let i=0 ; i<state?.length ; i++){
            if(state[i].id === id){
              sum = state[i].cont + 1;
              index = i; 
            }
          }
    
          if(sum) state?.push({id,cont:sum,name,price,img,category});
          else state?.push({id,cont:1,name,price,img,category});
    
          if(index !== undefined) state.splice(index,1);
    
          localStorage.setItem('ShoppingCar', JSON.stringify(state));
        }
        else localStorage.setItem('ShoppingCar', JSON.stringify([{id,cont:1,name,price,img,category}]));
        //localStorage.clear()
      }

  return (
    /*  name, year, description, img, strain, producer,  ID  de category, price, country */
    <div className={style.card}>
            <Link to={`/cardDetail/${id}`} style={{textDecoration:'none', color:'black'}}>
                <img className={style.cardImg} src={img} alt={name}/>
                <div className={style.cardInfo}>
                    <p className={style.textTitle}>{name}</p>
                    <p className={style.textBody}>{category}</p>
                </div>
            </Link>
            <div className={style.cardFooter}>
                <span className={style.textTitle}>${price}.00</span>
                {store && store.user.role && <div className={style.cardButton}>
                    <FavoriteIcon className={style.svgIcon} onClick={()=>handleFavs(name, year, description, img, strain, producer, id, price, country)}/>
                </div>}
                {store && store.user.role && <div className={style.cardButton}>
                  <FavoriteBorderIcon onClick={()=>handleDeleteFav(id)}/>
                  </div>}
                <div className={style.cardButton}>
                    <AddShoppingCartIcon className={style.svgIcon} onClick={()=>handleClickShopping(id)}/>
                </div>
            </div>
        
    </div>
    
  )
}
