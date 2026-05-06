import {
  trigger,
  state,
  style,
  transition,
  animate,
  query,
  group
} from '@angular/animations';

export const fadeAnimation = trigger('fadeAnimation', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('300ms ease-in', style({ opacity: 1 }))
  ]),
  transition(':leave', [
    animate('300ms ease-out', style({ opacity: 0 }))
  ])
]);

export const slideInLeft = trigger('slideInLeft', [
  transition(':enter', [
    style({ transform: 'translateX(-100%)', opacity: 0 }),
    animate('500ms cubic-bezier(0.25, 0.46, 0.45, 0.94)', style({ transform: 'translateX(0)', opacity: 1 }))
  ])
]);

export const slideInRight = trigger('slideInRight', [
  transition(':enter', [
    style({ transform: 'translateX(100%)', opacity: 0 }),
    animate('500ms cubic-bezier(0.25, 0.46, 0.45, 0.94)', style({ transform: 'translateX(0)', opacity: 1 }))
  ])
]);

export const slideInBottom = trigger('slideInBottom', [
  transition(':enter', [
    style({ transform: 'translateY(100%)', opacity: 0 }),
    animate('500ms cubic-bezier(0.25, 0.46, 0.45, 0.94)', style({ transform: 'translateY(0)', opacity: 1 }))
  ])
]);

export const scaleAnimation = trigger('scaleAnimation', [
  transition(':enter', [
    style({ transform: 'scale(0.8)', opacity: 0 }),
    animate('500ms cubic-bezier(0.16, 1, 0.3, 1)', style({ transform: 'scale(1)', opacity: 1 }))
  ])
]);

export const routeAnimation = trigger('routeAnimation', [
  transition('* <=> *', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        opacity: 0,
        transform: 'translateY(20px)'
      })
    ], { optional: true }),
    query(':enter', [
      style({ opacity: 0, transform: 'translateY(20px)' })
    ], { optional: true }),
    group([
      query(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'translateY(-20px)' }))
      ], { optional: true }),
      query(':enter', [
        animate('400ms 150ms cubic-bezier(0.16, 1, 0.3, 1)', style({ opacity: 1, transform: 'translateY(0)' }))
      ], { optional: true })
    ])
  ])
]);
