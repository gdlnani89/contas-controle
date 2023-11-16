const dataAtual = new Date()
const anoAtual = dataAtual.getFullYear()
const mesAtual = dataAtual.getMonth()
const diaAtual = dataAtual.getDate()

Vue.component('dia-altera', {
    props: ['variavel'],
    data: function () {
      return {
        // Remova a referência a this.dataAtual
        dia: new Date().getDate()
      };
    },
    methods: {
      // Adicione métodos para incrementar e decrementar o valor
      incrementarDia: function () {
        this.variavel++;
      },
      decrementarDia: function () {
        this.variavel--;
      }
    },
    template: `
      <p>
          <button style="width: 50px;" class="p-2" @click="decrementarDia">-</button>
          Dia
          <input v-model="variavel" class="p-1" type="number" style="width: 40px;" maxlength="2">
          <button style="width: 50px;" class="p-2" @click="incrementarDia">+</button>
      </p>
    `
  });
  

new Vue({
    el: "#app",
    data : {
        showMenu : false,
        mesString : [
            'janeiro',
            'fevereiro',
            'março',
            'abril',
            'maio',
            'junho',
            'julho',
            'agosto',
            'setembro',
            'outubro',
            'novembro',
            'dezembro'
        ],
        id : '',
        ano : dataAtual.getFullYear(),
        mesIndice : dataAtual.getMonth(),
        mes : '',
        dia : dataAtual.getDate(),
        descricao : '',
        valor : '',
        tipo : 'c',
        totalOM : '0,00',
        totalCong : '0,00',
        totalCongPix : '0,00',
        totalCongJW : '0,00',
        totalSaidas : '0,00',
        totalOperacional : '0,00',
        contas : [],
        contaSelecionada : [],
        showTabela: false,
        showListaDescrisao : false,
        showIncluir : false,
        btnMaisIncluir : true,
        btnMenosIncluir: false,
        btnEditar: true,
        btnVoltar: false,
        showTotal : false,
        btnMaisTotal : true,
        btnMenosTotal: false,
        showFooter : false,
        habilitaBtnEditar: true,
        showModalExtrato : false
    },
    methods : {
        formatarNumero(numero){
            let [parteInteira, parteDecimal] = numero.split(',')
            parteInteira = parteInteira.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
            parteDecimal = parteDecimal ? ',' + parteDecimal.padEnd(2, '0') : ',00';
            return parteInteira + parteDecimal;
        },
        incrementarDia(){
            this.dia++
        },
        decrementarDia(){
            this.dia--
        },
        mesAnterior(){
            // this.mesIndice--
            if(this.mesIndice <= 0 ){
                this.mesIndice = 11
                this.ano--  
                this.atualizaConta()
                this.clearData()
            }else{
                this.mesIndice--
                this.atualizaConta()
                this.clearData()
            }  
        },
        mesProximo(){
            if(this.mesIndice >= 11){
                this.mesIndice = 0
                this.ano++
            }else{
                this.mesIndice++
                this.atualizaConta()
            }
        },
        footerShow(){
            this.showFooter = true
        },
        footerClose(){
            this.showFooter = false
        },
        gerarId(){        
            let resultado = ''
            const caracteres = 'abcde0123456789'
            for(let i = 0; i < 5; i++){
                resultado += caracteres.charAt(Math.floor(Math.random() * caracteres.length))
            }

            return resultado
        },
        lancamento(){
            const idGera = this.gerarId()
            return {
                id : idGera,
                ano : this.ano,
                mes : this.mesIndice,
                dia : this.dia,
                descricao : this.descricao,
                valor : this.valor,
                tipo : this.tipo
            }
        },
        atualizaLs(){
            localStorage.setItem('coincontrol', JSON.stringify(this.contas))
        },
        addLancamento(){
            if(!this.descricao){
                document.getElementById('descricao').focus()
                return
            }
            if(!this.valor){
                document.getElementById('valor').focus()
                return
            }
            const dado = this.lancamento()
            this.contas.push(dado)
            this.atualizaLs()
            this.atualizaConta()
            this.descricao = ''
            this.valor = ''
            this.tipo = 'c'
        },
        filtrarLista(){
            if(this.contas.length){
                this.contaSelecionada = 
                    this.contas.filter((item)=> item.ano === this.ano && item.mes === this.mesIndice)
                this.contaSelecionada.sort((a,b)=> a.dia - b.dia)
            }else{
                this.contaSelecionada = []
            }
        },
        mapDescricao(desc){
            const arrayValor = 
                this.contaSelecionada.map(item => item.descricao === desc ? this.parseValor(item.valor) : 0)
            
            return arrayValor
        },
        mapTipo(tp){
            const arrayValor = 
                this.contaSelecionada.map(item => item.tipo === tp ? this.parseValor(item.valor) : 0)
            
            return arrayValor
        },
        totaisConta(array){
            const soma =
                array.reduce((acumulador, elemento)=>{
                return acumulador + elemento
            },0)

            return soma.toFixed(2)
        },
        atualizaConta(){
            this.filtrarLista()


        },
        parseValor(valor){
            if(valor.includes('.')) valor.replace('.','')
            valor = valor.replace(',','.')
            return parseFloat(valor)
        },
        clearData(){
            this.id = ''
            this.descricao = ''
            this.valor = ''
            this.tipo = 'c'
        },
        cancelarAlteracao(){
            this.clearData()
            this.showModalExtrato = false
            this.showFooter = false
        },
        selecionaElemento(e){
            this.showFooter = false
            this.habilitaBtnEditar = true
            const target = e.target.parentElement
            this.showModalExtrato = true;
            this.id = target.getAttribute('id')
            this.contas.forEach(item =>{
                if(item.id == this.id){
                    this.dia = item.dia
                    this.descricao = item.descricao
                    this.valor = item.valor
                    this.tipo = item.tipo
                }
            })
        },
        excluirElemento(){
            const novaLista = this.contas.filter(item => item.id !== this.id)
            this.contas = novaLista
            this.atualizaLs()
            this.atualizaConta()
            this.clearData()
            this.showModalExtrato = false
        },
        alteraElemento(){
            this.addLancamento()
            this.excluirElemento()
        }
    },
    mounted(){
        this.mes = this.mesString[this.mesIndice]
        this.contas = JSON.parse(localStorage.getItem('coincontrol')) || []
        this.atualizaConta()
    }
})