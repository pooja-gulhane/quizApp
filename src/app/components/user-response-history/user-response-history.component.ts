import { Component,OnInit,ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserResponseService } from 'src/app/services/user-response-service/user-response-service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-user-response-history',
  templateUrl: './user-response-history.component.html',
  styleUrls: ['./user-response-history.component.css']
})
export class UserResponseHistoryComponent implements OnInit {
  userId!: number;
  quizId!: number;
  userResponses: any[] = [];

  // @ViewChild('responseHistory', { static: false }) responseHistory!: ElementRef;



  constructor(
    private route: ActivatedRoute,
    private userResponseService: UserResponseService
  ) {}

  ngOnInit(): void {
    // Retrieve quizId and userId from the route
    this.quizId = Number(this.route.snapshot.paramMap.get('quizId'));
    this.userId = Number(this.route.snapshot.paramMap.get('userId'));

    // Call the API to get user responses for the quiz
    this.userResponseService.getUserResponsesByQuizAndUser(this.quizId, this.userId)
      .subscribe((responses) => {
        console.log(responses);
        this.userResponses = responses;
      });
  }

  // generatePDF(): void {
  //   const doc = new jsPDF({
  //     orientation: 'portrait',
  //     unit: 'pt',
  //     format: 'a4'
  //   });
  //   const pdfElement = document.getElementById('pdfContent');
 
  //   doc.html(pdfElement!, {
  //     callback: (pdf: jsPDF) => {
  //       pdf.save('UserResponse.pdf');
  //     },
  //     x: 20,      
  //     y: 20,     
  //     width: 550,
  //     windowWidth: pdfElement!.clientWidth
  //   });
  // }


  generatePDF(): void {
    const pdfElement = document.getElementById('pdfContent')!;
    
  
    // Convert HTML content to canvas using html2canvas
    html2canvas(pdfElement, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: 'a4'
      });
  
      // Calculate dimensions for image scaling
      const imgWidth = 575; // Adjust based on your PDF width
      const pageHeight = 840; // A4 page height
      const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio
      let heightLeft = imgHeight;
  
      let position = 10; // Start position on PDF
  
      // Add the image to the PDF
      doc.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
  
      // Create new pages if the content overflows
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
  
      // Save the generated PDF
      doc.save('UserResponse.PDF');
    });
  }
  
}
