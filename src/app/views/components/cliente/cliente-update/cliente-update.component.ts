import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-update',
  templateUrl: './cliente-update.component.html',
  styleUrls: ['./cliente-update.component.css']
})
export class ClienteUpdateComponent implements OnInit {
  id_cli=""
  cliente: Cliente= {
    id: '',
    nome: '',
    cpf: '',
    email: ''


  }
  nome= new FormControl('',[Validators.minLength(5)])
  cpf= new FormControl('',[Validators.minLength(11)])
  email= new FormControl('',[Validators.minLength(11)]) 

  constructor(private router: Router,
    private servicee: ClienteService,
    private route: ActivatedRoute) { }

    ngOnInit(): void {
      this.id_cli=this.route.snapshot.paramMap.get('id')!
      this.findyById();
    }
  update():void {
    this.servicee.update(this.cliente).subscribe((resposta) => {
      this.router.navigate(['clientes'])
      this.servicee.message('cliente atualizado  com sucesso!')

    }, err => {
      console.log(err)
      if (err.error.error.match('ja cadastrado')) {
        this.servicee.message(err.error.error)
      }
     else if(err.error.erros[0].message==="número do registro de contribuinte individual brasileiro (CPF) inválido"){
      this.servicee.message("Cpf inválido")
     
     }
    })
  }
  findyById():void{
    this.servicee.findyById(this.id_cli).subscribe(resposta =>{
      this.cliente=resposta
    })
  }

  cancel(): void {
    this.router.navigate(['clientes'])


  }
  
  
  
  
  

  errorvalidname(){
    if(this.nome.invalid){
      return 'o nome deve ter entre 5 e 100 carcteres!'
    }
    return false; 
  }
  errorvalidcpf(){
    if(this.cpf.invalid){
      return 'o cpf deve ter entre 11 e 15 carcteres!'
    }
    return false; 
  }
    
  errorvalidemail(){
  if(this.email.invalid){
    return 'o telefone deve ter 11 e 18 carcteres!'
  }
  return false; 
}
}



