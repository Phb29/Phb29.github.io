import { Component, OnInit } from '@angular/core';
import { FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';




import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-create',
  templateUrl: './tecnico-create.component.html',
  styleUrls: ['./tecnico-create.component.css']
})
export class TecnicoCreateComponent implements OnInit {
  tecnico: Tecnico = {
    id: '',
    nome: '',
    cpf: '',
    email: ''


  }
  nome= new FormControl('',[Validators.minLength(5)])
  cpf= new FormControl('',[Validators.minLength(11)])
  email= new FormControl('',[Validators.minLength(11)]) 

  constructor(private router: Router,
    private servicee: TecnicoService) { }

  ngOnInit(): void {
  }
  cancel(): void {
    this.router.navigate(['tecnicos'])

  }
  create(): void {
    this.servicee.create(this.tecnico).subscribe((resposta) => {
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

