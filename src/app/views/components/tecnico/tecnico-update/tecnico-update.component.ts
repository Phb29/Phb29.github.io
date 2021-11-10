import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-update',
  templateUrl: './tecnico-update.component.html',
  styleUrls: ['./tecnico-update.component.css']
})
export class TecnicoUpdateComponent implements OnInit {
  id_tec=''

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
    private servicee: TecnicoService,
    private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.id_tec=this.route.snapshot.paramMap.get('id')!
    this.findById();
  }
  update():void{
    this.servicee.update(this.tecnico).subscribe((resposta)=>{
      this.router.navigate(['tecnicos'])
      this.servicee.message('Tecnico atuaizado com suscesso!')
      
    },err => {
      console.log(err)
      if (err.error.error.match('ja cadastrado')) {
        this.servicee.message(err.error.error)
      }
     else if(err.error.erros[0].message==="número do registro de contribuinte individual brasileiro (CPF) inválido"){
      this.servicee.message("Cpf inválido")
     
     }
    })
  
  }

  findById():void{
    this.servicee.findById(this.id_tec).subscribe((resposta)=>{
      this.tecnico=resposta 
    })
    

  }
  cancel(): void {
    this.router.navigate(['tecnicos'])

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
