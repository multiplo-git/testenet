<template>
<!--https://medium.com/@hasanparasteh/ready-to-use-vue-js-navbar-bf79c43af6da -->
 <nav id="navbar" >
   
  <!--<div v-if="name" id="logo">
         {{ name }}
  </div>-->
 <!-- <div v-else id="logo">
       <img class="ImagemLogo" v-bind:src="logoImg" alt="Logo" />
  </div>-->
  <div id="logo">
       <!--<img class="ImagemLogo" src="/logoprincipal.png" alt="Logo" />-->
  </div>
  <div class="Telefone">
     <img src="/whatsapp.png" />
     <h2>98793-8479</h2>
  </div> 

 
  
      
  

  <div class="OpcoesMenu">
      <div v-if="(LarguraTela > 1024)" class="topnav" >

            <div  v-for="list in $store.state.stCategoriasSite.ListaCategorias" :key="list.idcategoria" >
                <nuxt-link class="NuxtLink" v-if="(PopulaSubCategorias(list.idcategoria).length === 0)" :to="{ path: '/',hash:''}">
                    <div class="ItemMenuPrincipal" @click="ClicouLink()">{{ list.categoria }}</div>
                    
                </nuxt-link>
                <div class="dropdown" v-else>
                 
                    <button class="dropbtn" @mouseover="HabilitaDropPC('ItensDropDown'+list.idcategoria)">{{ list.categoria }}<span class="SetaDropDown">&#9660;</span> </button>
                 
                    <div :id="'ItensDropDown'+list.idcategoria" class="dropdown-content" @mouseleave="closeMenuDropPC('ItensDropDown'+list.idcategoria)">
                      <div  v-for="item in PopulaSubCategorias(list.idcategoria)" :key="item.idsubcategoria" > 
                      
                          <nuxt-link class="NuxtLink" :to="{ path: '/',hash:''}">
                            <div class="ItemMenuDrop"  @click="ClicouLinkDropPC('ItensDropDown'+list.idcategoria)">{{ item.subcategoria }}</div>
                           <!-- <div v-else class="activeItemDrop"  @click="ClicouLinkDrop(item.hash)">{{ item.name }}</div>-->
                          </nuxt-link>      
                      </div>
                    </div>
                </div>
            </div>
      </div>

      <div v-if="(LarguraTela < 1024)" @click="AbrirMobileNav()" id="burger">
            <div class="line1"></div>
            <div class="line2"></div>
            <div class="line3"></div>
      </div>

      <div id="myNav" class="overlay">
              
              <!-- Button to close the overlay navigation -->
             <!-- <a href="javascript:void(0)" class="closebtn" @click="closeNav()">&times;</a>-->

               <div class="overlay-content">
                       
                      <div  v-for="list in $store.state.stCategoriasSite.ListaCategorias" :key="list.idcategoria" >
                        <nuxt-link class="NuxtLink" v-if="(PopulaSubCategorias(list.idcategoria).length === 0)" :to="{ path: '/',hash:''}">
                            <div class="ItemMenuMobile" v-if="$route.path !== list.link" @click="ClicouLink('')">{{ list.categoria }}</div>
                           <!-- <div v-else class="activeItemMobile"  @click="ClicouLink(list.hash)">{{ list.name }}</div>-->
                        </nuxt-link>
                        <div class="DivExternaCategoria"  v-else>
                            <div class="CategoriaDrop">{{ list.categoria }}<span class="SetaDropDown">&#9660;</span> </div>
                            
                            <div class="DivExternaItensCategoria">
                                  <div  v-for="item in PopulaSubCategorias(list.idcategoria)" :key="item.idsubcategoria" > 
                                  
                                      <nuxt-link class="NuxtLink" :to="{ path: '/',hash:''}">
                                        <div class="ItemMenuDropMobile"  @click="ClicouLinkDrop('')">{{ item.subcategoria }}</div>
                                      <!--  <div v-else class="activeItemDropMobile"  @click="ClicouLinkDrop(item.hash)">{{ item.name }}</div>-->
                                      </nuxt-link>      
                                  </div>
                            </div>
                        </div>                         
                      </div>
                </div>

              <!-- Overlay content -->
             <!-- <div class="overlay-content">
                <a href="#">About</a>
                <a href="#">Services</a>
                <a href="#">Clients</a>
                <a href="#">Contact</a>
              </div>-->
      </div>
  </div>

    
 </nav>
</template>


<script>
/* eslint-disable */



export default {
  name: "Navbar",
  
  props:{

  },
  components: {
   
  },
  computed: {
        
        PopulaSubCategorias() {

              return (idCateg) => {
                let ArraySubCateg = []
               
                if (this.$store.state.stSubCategoriasSite.ListaSubCategorias !== null)
                    ArraySubCateg = this.$store.state.stSubCategoriasSite.ListaSubCategorias.filter(function (item) {
                                                if (item.idcategoria === idCateg) {
                                                    return true
                                                    } else {
                                                    return false
                                                    }
                        })
               
                return ArraySubCateg;
             }
         },
  },
  data() {
    return {
            MenuDrop:null,
            burger:null,
            LarguraTela:0,
            dropdownLink:null,
            lastScrollTop :0,
            navbar:Object,
            navLinks: [ 
              {name: 'Início',id: 1,link: '/',hash:'#inicio',dropdown: false,id: 1},
             // {name: 'Nossos serviços',link: this.$route.path,id: 2,hash:'', dropdown: true, dropdownLinks: [ 
                {name: 'Nossos serviços', dropdown: true, dropdownLinks: [ 
                  { name: 'Crianças com idade de 1 a 5 anos', link: '/aluguel-brinquedos-1a5',hash:'', dropdown: false,id: 3 },
                  { name: 'Crianças com idade de 6 a 8 anos', link: '/aluguel-brinquedos-6a8',hash:'', dropdown: false,id: 4 },
                  { name: 'Crianças com idade de 9 a 11 anos', link: '/aluguel-brinquedos-9a11',hash:'', dropdown: false,id: 5 },
                  { name: 'Crianças acima de 12 anos', link: '/aluguel-brinquedos-maiores',hash:'', dropdown: false,id: 6 },
                ],
              },
            
              { name: 'Fale conosco', link: '/contato',hash:'',dropdown: false,id: 7 },
          ]

    };
  }, // data
  methods: {

    AbrirMobileNav() {
          document.getElementById("myNav").style.height = "100%";
          this.burger = document.getElementById('burger')
          this.burger.classList.toggle('toggle')
          console.log('burger :', burger)
          console.log('burger.className :', burger.className)
          if (this.burger.className === '')
              this.closeNav();
      /*  var x = document.getElementById("myTopnav");
        if (x.className === "topnav") {
          x.className += " responsive";
        } else {
          x.className = "topnav";
        }*/

    },
    ClicouLinkDropPC(idMenuDropDown) {
        document.getElementById(idMenuDropDown).style.display = 'none'
    },
    ClicouLinkDrop(hash) {
     
    //  if (this.larguraTela > 1024) {
        //   console.log('this.larguraTela:', this.$store.state.LarguraTela)
     //  }
       
       console.log('Rota drop:', this.$route.path)
      // console.log('Rota name:', this.$route.name)
      if (hash !== '') {
          console.log('clicou link drop', hash)
         // this.$scrollTo(hash, 300, { easing: 'linear',offset: 0})
      }

      if (this.LarguraTela < 1024) {
        this.closeNav();
        this.burger.classList.toggle('toggle')
      } else {
        this.closeMenuDropPC();
      }

    } ,
    ClicouLink(hash) {
            
       console.log('Rota path:', this.$route.path)
      // console.log('Rota name:', this.$route.name)
      if (hash !== '') {
          console.log('clicou link hash', hash)
          this.$scrollTo(hash, 300, { easing: 'linear',offset: 0})
      }

      if (this.LarguraTela < 1024) {
        this.closeNav();
        this.burger.classList.toggle('toggle')
      }
    } ,
    HabilitaDropPC(idMenuDropDown) {
      //  this.MenuDrop = document.querySelector('.dropdown-content')
          this.OCultaMenusAbertos();
          document.getElementById(idMenuDropDown).style.display = 'block'
      
        //this.MenuDrop.style.display = 'block'
    },
    closeMenuDropPC(idMenuDropDown) {
      document.getElementById(idMenuDropDown).style.display = 'none'
      //  this.MenuDrop = document.querySelector('.dropdown-content')
      //  this.MenuDrop.style.display = 'none'
        //setTimeout(function(){ MenuDrop.style.display = 'block' }, 1000);
        
    },
    OCultaMenusAbertos() {
      for (let i = 0; i < this.$store.state.stCategoriasSite.ListaCategorias.length; i++) {
            const idcat = this.$store.state.stCategoriasSite.ListaCategorias[i].idcategoria;
           document.getElementById('ItensDropDown'+idcat).style.display = 'none'
      }
          
    },
    closeNav() {
        document.getElementById("myNav").style.height = "0%";
    },
    larguraDaTela(event) {
        this.LarguraTela = window.innerWidth
         // console.log('largura tela inicio :', window.innerWidth)         
          //this.$store.commit('SET_LarguraTela',window.innerWidth)         
        //  console.log('largura tela store :', this.$store.state.LarguraTela)          
          
    },
    AlterouRota(){
        console.log('Alterou rota nav :',this.burger)         
        if (this.LarguraTela < 1024) {
          if (this.burger !== null) 
            if (this.burger.classList !== null) {
                console.log('Alterou rota this.burger.classList :',this.burger.classList)         
                if (this.burger.className !== '')
                    this.burger.classList.toggle('toggle')
            }
          this.closeNav();
           
        }
    }
    
    
  },
  mounted() {
         this.LarguraTela = window.innerWidth
         window.addEventListener('popstate', this.AlterouRota);
         window.addEventListener('resize', this.larguraDaTela);
       

        // https://www.youtube.com/watch?v=JEBgqbZWYIQ  como tornar a nav com recolhimento
        this.navbar = document.getElementById("navbar");
        let v = this;
        window.addEventListener("scroll",function(){
          var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          if (scrollTop > v.lastScrollTop) {
            console.log('largura scroll em nav:', v.LarguraTela)
           /* if (v.larguraTela < 1024) {
                v.navbar.style.top = "-150px"
            } else*/
                v.navbar.style.top = "-90px"
          } else {
            v.navbar.style.top = "0px"
          }
          v.lastScrollTop = scrollTop;
        })
    },
    beforeDestroy() { 
      window.removeEventListener('popstate', this.AlterouRota);
      window.removeEventListener('resize', this.larguraDaTela); 
      
    }
};
</script>

<style scoped>

nav {
    -webkit-box-shadow: 2px 2px 10px 0px rgba(39, 50, 63, 0.75);
    -moz-box-shadow:    2px 2px 10px 0px rgba(39, 50, 63, 0.75);
    box-shadow:         2px 2px 10px 0px rgba(39, 50, 63, 0.75);

    width: 100%;
    display: grid !important;
    grid-template-rows: 90px ;
    grid-template-columns: 25% 20% 55% !important;
    grid-template-areas: "logo telefone opcoesmenu";

    height: 90px;
    font-family: 'Montserrat', sans-serif;
    position: fixed; /* Set the navbar to fixed position */
    top: 0;
    
    background-color: white;
    z-index: 999;

    box-sizing: border-box;
    transition: 0.5s;
}


.Telefone{
  grid-area: telefone !important;
  display: flex !important;
  align-items: center;
  justify-content: center;
  
  
}

.Telefone img{
  height: 40px;
  width: 40px;
  margin-right: 10px;
}

.ImagemSeta{
  height: 20px;
  width: 20px;
}

#logo {
  grid-area: logo !important;
 
  display: flex !important;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  
 
}


.ImagemLogo {
 object-fit: cover;
 max-height: 90px;
 max-width: 25vw;
 padding-top: 10px;
 padding-bottom: 10px;
 padding-left: 30px;
  
}

.OpcoesMenu{
  grid-area: opcoesmenu !important;
  width: 100%;
  display: flex !important;
  align-items: center;
  justify-content: center;
  
}



#burger {

cursor: pointer;
}

#burger div {
width: 30px;
height: 3px;
margin: 8px;

background-color: blue;
transition: all 0.3s ease-in;

}





.nav-active {
  
  transform: translateX(0) !important; /* manter o !iportant senão não abre o menu */
}
.toggle .line1 {
  transform: rotate(-45deg) translate(-9px, 10px);
}
.toggle .line2 {
  opacity: 0;
}
.toggle .line3 {
  transform: rotate(45deg) translate(-5px, -6px);
}

@keyframes navLinkFade {
  from {
    opacity: 0;
    transform: translateX(-60px);
  }
to {
    opacity: 1;
    transform: translateX(0px);
  }
}

/* novo a partir daqui  */

.topnav {
  overflow: hidden;
  display: flex ;
  align-items: center;
  justify-content: flex-start;

}


.NuxtLink{
     text-decoration: none;
}

.ItemMenuPrincipal {
  
  color:rgb(90, 90, 90);
  text-align: center;
  padding: 8px 15px;
  
  font-size: 17px;
  margin-left: 10px;
  margin-right: 10px;
}


.ItemMenuPrincipal:hover , .active:hover ,.dropdown:hover{
  
  background-color: rgb(223, 246, 255);
  border-radius: 30px;
  color: rgb(66, 66, 66);
  cursor: pointer;
}

.SetaDropDown{
  padding-left: 10px;
  
}

.active {
  background-color: #d1f1fc;
  border-radius: 30px;
  color: rgb(66, 66, 66);
  text-align: center;
  padding: 8px 15px;
  text-decoration: none;
  font-size: 17px;
  margin-left: 10px;
  margin-right: 10px;
}


.dropdown {
  float: left;
  overflow: hidden;
}

.dropdown .dropbtn {
  font-size: 17px;    
  border: none;
  outline: none;
  
  color:rgb(90, 90, 90);
  padding: 10px 12px;
  background-color: inherit;
  font-family: inherit;
  margin: 0;
  margin-left: 10px;
  margin-right: 10px;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  padding-left: 0px;
  padding-right: 0px;
}

.dropdown:hover .dropdown-content {
  display: block;
  cursor: pointer;
}

.dropdown-content:not(:hover) {
 /* display: none;*/
}

.ItemMenuDrop {
    color: black;
    padding: 12px 16px;
    margin-bottom: 5px;
}

.ItemMenuDrop:hover{
    background-color: rgb(223, 246, 255);
    color: black;
    padding: 12px 16px;
    cursor: pointer;
}

.activeItemDrop{
   background-color:  #d1f1fc;
   color: black;
    padding: 12px 16px;
    margin-bottom: 5px;
    
}









/* Nav modelo mobile  */

/* The Overlay (background) */

.overlay {
  
  display: block;
  height: 0%;
  width: 100%;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  margin-top: 90px;
  background-color: rgb(0, 0, 0);
 /* background-color: rgba(255, 255, 255, 0.9);*/
  overflow-y: hidden;
  transition: 0.5s;
}



.overlay-content {
  position: relative;
  top: 0px;
  width: 100%;
  text-align: center;
  /*margin-top: 30px;*/
}

/*
.overlay{
    padding: 8px;
    color: #818181;
    display: block;
    transition: 0.3s;
}*/

.ItemMenuMobile{
    display: flex ;
    align-items: center;
    justify-content:flex-start;
    background-color: rgb(77, 77, 77);
    color: white;
    padding-top: 15px;
    padding-bottom: 15px;
    padding-left: 20px;
    padding-right: 20px;
    font: 1.2rem verdana, arial, tahoma, sans-serif;
    
    border-bottom-style: solid;
    border-bottom-width: thin;
    border-bottom-color: rgb(168, 168, 168);
}


.ItemMenuMobile:hover {
  color: #f1f1f1;
}

.activeItemMobile{
     display: flex ;
    align-items: center;
    justify-content:flex-start;
    background-color: rgb(173, 172, 255);
    color: white;
    padding-top: 15px;
    padding-bottom: 15px;
    padding-left: 20px;
    padding-right: 20px;
}

.CategoriaDrop{
  display: flex ;
  align-items: center;
  justify-content:space-between;
  background-color:rgb(77, 77, 77);
  color: white;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 20px;
  padding-right: 20px;
  font: 1.2rem verdana, arial, tahoma, sans-serif;
}

.DivExternaItensCategoria{
  
}

.ItemMenuDropMobile{
  display: flex ;
  align-items: center;
  justify-content:flex-start;
  background-color: rgb(116, 116, 116);
  color: white;
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 40px;
  padding-right: 20px;
   font: 1.1rem verdana, arial, tahoma, sans-serif;
   border-bottom-style: solid;
   border-bottom-width: thin;
   border-bottom-color: rgb(231, 231, 231);
   
}

.activeItemDropMobile{
  display: flex ;
  align-items: center;
  justify-content:flex-start;
  font: 1.1rem verdana, arial, tahoma, sans-serif;
  background-color: rgb(173, 172, 255);
  color: white;
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 40px;
  padding-right: 20px;
}

/*
.overlay a {
  padding: 8px;
  text-decoration: none;
  font-size: 36px;
  color: #818181;
  display: block;
  transition: 0.3s;
}*/
/*
.overlay a:hover, .overlay a:focus {
  color: #f1f1f1;
}*/

.overlay .closebtn {
  text-decoration: none;
  position: absolute;
  top: 20px;
  right: 45px;
  font-size: 70px;
  color: white;
}

/* FIM Nav modelo mobile  */

/* Tablet */
@media screen and (max-width: 1024px) {
  nav {
    -webkit-box-shadow: 2px 2px 10px 0px rgba(39, 50, 63, 0.75);
    -moz-box-shadow:    2px 2px 10px 0px rgba(39, 50, 63, 0.75);
    box-shadow:         2px 2px 10px 0px rgba(39, 50, 63, 0.75);

    width: 100%;
    display: grid !important;
    grid-template-rows: 90px ;
    grid-template-columns: 40% 60% !important;
    grid-template-areas: 
          "logo  opcoesmenu";
         

    height: 90px;
 
}

#logo {
 
  display: flex !important;
  align-items: center;
  justify-content: center;
  
}


.ImagemLogo {
 
 max-height: 90px;
 max-width: 30vw;
 padding-top: 10px;
 padding-bottom: 10px;
 
}


.OpcoesMenu{
  display: flex !important;
  align-items: center;
  justify-content: center;
  
}

.Telefone{

  
}

.Telefone img{
  height: 40px;
  width: 40px;
  margin-right: 10px;
}

.ImagemSeta{
  height: 20px;
  width: 20px;
}



/* novo a partir daqui */

.topnav div:not(:first-child), .dropdown .dropbtn {
    display: none;
  }
 /* .topnav div.icon {
    float: right;
    display: block;
  }*/

/* Nav modelo mobile  */
  .overlay {overflow-y: auto;}
  .overlay a {font-size: 20px}
  .overlay .closebtn {
  font-size: 40px;
  top: 15px;
  right: 35px;
  }
/* FIM Nav modelo mobile  */

}


/* Mobile */
@media screen and (max-width: 768px) {

  nav {
  
    display: grid !important;
    grid-template-rows: 90px;
    grid-template-columns: 80% 20% !important;
    grid-template-areas: 
          "logo opcoesmenu";
         
         

    height: 90px;
}

#logo {
 
  display: flex !important;
  align-items: center;
  justify-content: center;
  
  
 
}


.ImagemLogo {
 
 max-height: 90px;
 max-width: 70vw;
 padding-top: 10px;
 padding-bottom: 10px;
 
}

.OpcoesMenu{
  display: flex !important;
  align-items: center;
  justify-content: flex-end;
  padding-right: 30px;
  
}

.Telefone{

  
}

.Telefone img{
  height: 40px;
  width: 40px;
  margin-right: 10px;
}

.ImagemSeta{
  height: 20px;
  width: 20px;
}


/* novo a partir daqui */

.topnav div:not(:first-child), .dropdown .dropbtn {
    display: none;
  }


/*.topnav div.icon {
    float: right;
    display: block;
  }*/

/* Nav modelo mobile  */
  


  
  .overlay .closebtn {
    font-size: 40px;
    top: 15px;
    right: 35px;
  }
/* FIM Nav modelo mobile  */

}

</style>
