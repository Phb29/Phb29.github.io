import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.css']
})
export class ClienteCreateComponent implements OnInit {
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
    private servicee: ClienteService) { }

  ngOnInit(): void {
  }
  cancel(): void {
    this.router.navigate(['clientes'])

  }
  create(): void {
    this.servicee.create(this.cliente).subscribe((resposta) => {
      this.router.navigate(['tecnicos'])
      this.servicee.message('Tecnico criado com sucesso!')

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


