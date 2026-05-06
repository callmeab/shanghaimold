import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PortfolioResolver implements Resolve<any> {
  resolve(): Observable<any> {
    return of({
      projects: [
        {
          id: 1,
          title: 'Automotive Dashboard Component',
          category: 'Automotive',
          client: 'BMW Group',
          year: 2023,
          image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=900&q=80',
          description: 'High-precision injection molded dashboard component integrating seamless mounting clips requiring extreme structural tolerances.'
        },
        {
          id: 2,
          title: 'Surgical Toolkit Casing',
          category: 'Medical',
          client: 'MedTech Solutions',
          year: 2024,
          image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=900&q=80',
          description: 'ISO-certified cleanroom manufacturing of complex polycarbonate surgical components allowing high-heat sterilization.'
        },
        {
          id: 3,
          title: 'Smart Home Hub Shielding',
          category: 'Electronics',
          client: 'Alpha Electronics',
          year: 2023,
          image: 'https://images.unsplash.com/photo-1558346490-a72e53ae5003?auto=format&fit=crop&w=900&q=80',
          description: 'Custom conductive overmolding shielding vital internal PCB components from external RF interference successfully.'
        },
        {
          id: 4,
          title: 'Luxury Kitchen Appliance Base',
          category: 'Consumer Products',
          client: 'ChefLine Pro',
          year: 2022,
          image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=900&q=80',
          description: 'High-gloss exterior appliance mold integrating thick-wall cooling techniques ensuring zero-sink aesthetic limits.'
        },
        {
          id: 5,
          title: 'EV Battery Housing',
          category: 'Automotive',
          client: 'Tesla Motors',
          year: 2024,
          image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=900&q=80',
          description: 'Heavy duty, flame-retardant injection molded structural battery containment unit with advanced cooling channels.'
        },
        {
          id: 6,
          title: 'Insulin Delivery Pen',
          category: 'Medical',
          client: 'BioPharma Inc',
          year: 2023,
          image: 'https://images.unsplash.com/photo-1628348070830-4e365ad4830b?auto=format&fit=crop&w=900&q=80',
          description: 'Multi-cavity high volume micro-molding ensuring exceptional dose accuracy for portable insulin delivery pens.'
        }
      ]
    }).pipe(delay(300));
  }
}
