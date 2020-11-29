import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';

import { CHECKOUT_SUCCEEDED, clearCart } from '../actions';
import { Router } from '@angular/router';

@Injectable()
export class CartEffects {
  checkoutSucceeded$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CHECKOUT_SUCCEEDED),
      tap(() => this.router.navigate(['/'])),
      map(() => clearCart())
    )
  );

  constructor(private actions$: Actions, private router: Router) {}
}
