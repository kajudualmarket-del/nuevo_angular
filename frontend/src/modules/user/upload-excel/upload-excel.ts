// frontend/src/app/modules/user/upload-excel/upload-excel.ts (FINAL CORREGIDO Y COMPLETO)

import { Component, inject } from '@angular/core'; 
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 
import { HttpClient } from '@angular/common/http'; // <-- Importar HttpClient
import { environment } from 'src/environments/environment'; // <-- Importar environment

@Component({
  selector: 'app-upload-excel',
  standalone: true, 
  imports: [CommonModule, FormsModule], 
  // Nota: Si HttpClientModule ya está en tu app.config.ts o AppModule, no necesitas providers: []
  templateUrl: './upload-excel.html',
  styleUrl: './upload-excel.css'
})
export class UploadExcelComponent { 

  // La URL del endpoint DEBE coincidir con el backend: /api/v1/users/upload-excel/
  private uploadUrl = environment.apiUrl + '/api/v1/users/upload-excel/';
  private http = inject(HttpClient); 

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
    
    // Usar FormData para enviar el archivo
    const formData = new FormData();
    // 'file' debe coincidir con el nombre de la variable en el Backend: UploadFile = File(...)
    formData.append('file', this.selectedFile, this.selectedFile.name);

    this.http.post(this.uploadUrl, formData).subscribe({
        next: (response: any) => {
            this.uploading = false;
            this.message = response.message || 'Carga masiva completada.';
            this.selectedFile = null;
            // Opcional: Redirigir o emitir un evento para recargar la lista de usuarios
        },
        error: (err) => {
            this.uploading = false;
            console.error('Error en la carga masiva:', err);
            // Mostrar mensaje de error del backend si está disponible
            this.message = `Error en la carga: ${err.error?.detail || 'Revisa el log.'}`;
        }
    });
  }
}