import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Producto } from 'src/app/models/producto';
import { ToastrService } from 'ngx-toastr';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {
  productoForm: FormGroup;
  constructor(private fb: FormBuilder,
                private router: Router,
                private toastr: ToastrService,
                private _productoService: ProductoService) { 
    this.productoForm = this.fb.group({
      producto: ['', Validators.required],
      categoria: ['', Validators.required],
      ubicacion: ['', Validators.required],
      precio: ['', Validators.required],
    })
  }

  ngOnInit(): void {
  }

  agregarProducto(){
    console.log(this.productoForm)

    console.log(this.productoForm.get('producto')?.value)

    const PRODUCTO: Producto = {
      nombre: this.productoForm.get('producto')?.value,
      categoria: this.productoForm.get('categoria')?.value,
      ubicacion: this.productoForm.get('ubicacion')?.value,
      precio: this.productoForm.get('precio')?.value,
    }
    console.log(PRODUCTO)
    this._productoService.guardarPorducto(PRODUCTO).subscribe(data => {
      this.toastr.success('El producto fue registrado con exito', 'Producto Registrado!');
      this.router.navigate(['/']);
    }, error => {
      console.log(error)
      this.productoForm.reset();
    }
    )

  }
}
