
import { OrdenaPosicaoDeUmArray } from "../assets/uteis"

export const state = () => ({
        ListaCategorias:null,
        
        
  })

  export const mutations = {
      SET_Categorias(state,categorias){
        state.ListaCategorias = categorias
        state.ListaCategorias.sort(OrdenaPosicaoDeUmArray);
      },
      SET_OrdenaCategorias(state){
        state.ListaCategorias.sort(OrdenaPosicaoDeUmArray);
      },
      SET_PosicaoCategorias(state,params){
        var indx = state.ListaCategorias.findIndex(item => item.idcategoria === params.idcategoria);
        if (indx > -1) {
          state.ListaCategorias[indx].posicao = params.posicao
         // console.log("ATUALIZOU SET SET_PosicaoCategorias = ",params.idcategoria);
        }
       
        
        
      },
      SET_TituloCategorias(state,params){
        var indx = state.ListaCategorias.findIndex(item => item.idcategoria === params.idcategoria);
        if (indx > -1) {
          state.ListaCategorias[indx].categoria = params.categoria
          console.log("ATUALIZOU SET SET_TituloCategorias = ",params.categoria);
        }
      },
      POST_TituloCategorias(state,params){
        state.ListaCategorias.push(params)
      },
      DELETE_TituloCategorias(state,params){
        var indx = state.ListaCategorias.findIndex(item => item.idcategoria === params.idcategoria);
        if (indx > -1) {
          state.ListaCategorias.splice(indx, 1);
          console.log("DELETOU titulo categ = ",params.idcategoria);
        }
      },
      
      
  }

export const actions = {

  async PopulaCategoriasSite({commit},params) {
            let RespPadrao = {}
            //let caminho = this.$axios.defaults.baseURL + "/padrao"   
            let caminho = this.$axios.defaults.baseURL + "/padrao"   
            let instrucao = "SELECT idcategoria,categoria,posicao FROM categsite WHERE idsiteconfig = " + params.idsiteconfig + ";"
            let formData = new FormData()             
            formData.append("instrucaoSQL",instrucao);
            formData.append("tipoInstrucao",0); // 0 =select 1,2,3 insert,update,delete
           
            let  resp = await this.$axios.put(caminho,formData)
            if (resp.status === 200) {
                
                commit('SET_Categorias',resp.data.dados)
                RespPadrao.Erro = false;
                
                return RespPadrao
            }  else {
                RespPadrao.Erro = true;
                RespPadrao.msgErro = 'error popular categorias'
                console.log("error popular categorias", err);

                return RespPadrao
            }  
    
     
  },
  async CommitCategoria({commit},params) {
      
      commit('SET_Categorias',params.dados)
  },
  async AtualizaPosicaoCategorias({commit},params) {
    
            let RespPadrao = {}
            let caminho = this.$axios.defaults.baseURL + "/padrao"   
           // console.log('Inicio atualização => ');
          
            const eArr = params.categorias[Symbol.iterator]();
          
            let cont = 0;
            for (let elem of eArr) {
                    cont = cont + 1;
                    
                    let instrucao = "UPDATE categsite SET posicao = " + cont + " WHERE idcategoria =" + elem.idcategoria + ";";    
                    let formData = new FormData()             
                    formData.append("instrucaoSQL",instrucao);
                    formData.append("tipoInstrucao",2); // 0 =select 1,2,3 insert,update,delete
                    try {
                          let  resp = await this.$axios.put(caminho,formData)
                          if (resp.status === 200) {
                              var paramsCateg = {idcategoria:elem.idcategoria,posicao:cont}
                              commit('SET_PosicaoCategorias',paramsCateg)
                          }
                      }catch (err) {
                        console.log("error atualizar posição categorias", err);
                      }    
                     
                    if (cont === params.categorias.length) {
                      console.log("ORDENOU posição => ",cont);   
                      commit('SET_OrdenaCategorias')
                      
                     }
            }

           // commit('SET_OrdenaCategorias')
  },
  async AtualizaCategoria({commit},params) {
    let RespPadrao = {}
    let caminho = this.$axios.defaults.baseURL + "/padrao"   
    console.log('params AtualizaCategoria => ',params);
              
            
            let instrucao = "UPDATE categsite SET categoria = '" + params.categoria + "' WHERE idcategoria =" + params.id + ";";    
            let formData = new FormData()             
            formData.append("instrucaoSQL",instrucao);
            formData.append("tipoInstrucao",2); // 0 =select 1,2,3 insert,update,delete
            let  resp = await this.$axios.post(caminho,formData)
            if (resp.status === 200) {
                var paramsCateg = {idcategoria:params.id,categoria:params.categoria}
                commit('SET_TituloCategorias',paramsCateg)
                RespPadrao.Erro = false;
                RespPadrao.id = params.id;
                return RespPadrao
            }  else {
                RespPadrao.Erro = true;
                RespPadrao.msgErro = 'Erro ao atualizar título categoria'
                console.log("Erro ao atualizar título categoria", err);

                return RespPadrao
            }  
         
  },
  async InsereCategoria({commit},params) {
    let RespPadrao = {}
    let caminho = this.$axios.defaults.baseURL + "/padrao"   
    console.log('Inicio inserção => ');
              
            
            let instrucao = "INSERT INTO categsite (categoria,idsitepadrao,idsitecliente) VALUES('" + params.categoria +  "' , " + 1 + "," + 1 + ");";
            let formData = new FormData()             
            formData.append("instrucaoSQL",instrucao);
            formData.append("tipoInstrucao",1); // 0 =select 1,2,3 insert,update,delete
            let resp = await this.$axios.post(caminho,formData);
            if (resp.status === 200) {
              console.log("resp inserção : ", resp.data.dados);
              var paramsCateg = {idcategoria:resp.data.dados.insertId,categoria:params.categoria,posicao:2000}
              commit('POST_TituloCategorias',paramsCateg)
              RespPadrao.Erro = false;
              RespPadrao.id = resp.data.dados.insertId;
              RespPadrao.posicao = 2000;
              return RespPadrao
            } else {
              RespPadrao.Erro = true;
              RespPadrao.msgErro = 'Erro ao inserir título categoria'
              console.log("Erro ao inserir título categoria", err);

              return RespPadrao
           };
  
  },
  async ExcluiCategoria({commit},params) {
    let RespPadrao = {}
    let caminho = this.$axios.defaults.baseURL + "/padrao"   
    console.log('Inicio atualização => ');
         
                
            let instrucao = "DELETE FROM categsite WHERE idcategoria=" + params.id + ";";
            let formData = new FormData()             
            formData.append("instrucaoSQL",instrucao);
            formData.append("tipoInstrucao",3); // 0 =select 1,2,3 insert,update,delete
            let resp = await this.$axios.post(caminho,formData);
            if (resp.status === 200) {
                  console.log("resp exclusão : ", resp);
                  var paramsCateg = {idcategoria:params.id}
                  commit('DELETE_TituloCategorias',paramsCateg)
                  RespPadrao.Erro = false;
                  RespPadrao.id = params.id;
                  return RespPadrao
                } else {
                  RespPadrao.Erro = true;
                  RespPadrao.msgErro = 'Erro ao excluir título categoria'
                  console.log("Erro ao excluir título categoria", err);

                  return erro
              };
  
  },
  
    
}


 