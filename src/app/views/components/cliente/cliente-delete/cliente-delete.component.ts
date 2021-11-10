import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-cliente-delete',
  templateUrl: './cliente-delete.component.html',
  styleUrls: ['./cliente-delete.component.css']
})
export class ClienteDeleteComponent  implements OnInit {

  id_tec=''

  tecnico: Cliente = {
    id: '',
    nome: '',
    cpf: '',
    email: ''
  }


  constructor(private router: Router,
    private servicee: ClienteService,
    private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.id_tec=this.route.snapshot.paramMap.get('id')!
    this.findById();
  }
  delete():void{
    this.servicee.delete(this.id_tec).subscribe(resposta =>{
      this.router.navigate(['tecnicos'])
      this.servicee.message('deletado com succeso!')
    },err =>{
      if(err.error.error.match('possui ordem de serviço')){
        this.servicee.message(err.error.error)
      }
      }
      
    )
  }


  
  

  findById():void{
    this.servicee.findyById(this.id_tec).subscribe((resposta)=>{
      this.tecnico=resposta 
    })
    

  }
  cancel(): void {
    this.router.navigate(['tecnicos'])

  }
  
  
}

