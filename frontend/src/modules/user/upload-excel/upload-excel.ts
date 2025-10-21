// frontend/src/app/modules/user/upload-excel/upload-excel.ts (Corregido)

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // ✅ Añadido para *ngIf, *ngFor, etc.
import { FormsModule } from '@angular/forms'; // Añadido para two-way binding con el input (opcional, pero buena práctica)

@Component({
  // Se recomienda usar el sufijo 'Component' para la clase
  selector: 'app-upload-excel',
  standalone: true, // Debe ser standalone
  imports: [CommonModule, FormsModule], // ✅ Importaciones añadidas
  templateUrl: './upload-excel.html',
  styleUrl: './upload-excel.css'
})
export class UploadExcelComponent { // ✅ Clase renombrada a 'UploadExcelComponent'

  // Propiedades requeridas para la lógica de subida
  selectedFile: File | null = null;
  uploading: boolean = false;
  message: string = '';

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.message = '';
  }

  onUpload() {
    if (!this.selectedFile) {
      this.message = 'Por favor, selecciona un archivo.';
      return;
    }

    this.uploading = true;
    this.message = 'Subiendo...';
    
    // AQUÍ VA LA LÓGICA REAL DE HTTP PARA SUBIR EL ARCHIVO
    // Por ahora, simularemos la subida.
    setTimeout(() => {
        this.uploading = false;
        this.message = `Archivo ${this.selectedFile?.name} subido con éxito.`;
        this.selectedFile = null;
    }, 2000);
  }
}