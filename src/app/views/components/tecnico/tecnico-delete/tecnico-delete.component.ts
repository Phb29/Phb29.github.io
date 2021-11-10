import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-delete',
  templateUrl: './tecnico-delete.component.html',
  styleUrls: ['./tecnico-delete.component.css']
})
export class TecnicoDeleteComponent implements OnInit {

  id_tec=''

  tecnico: Tecnico = {
    id: '',
    nome: '',
    cpf: '',
    email: ''
  }


  constructor(private router: Router,
    private servicee: TecnicoService,
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
    this.servicee.findById(this.id_tec).subscribe((resposta)=>{
      this.tecnico=resposta 
    })
    

  }
  cancel(): void {
    this.router.navigate(['tecnicos'])

  }
  
  
}

