import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AhorcadoComponent } from 'src/app/components/games/ahorcado/ahorcado.component';
import { DesertRaceComponent } from 'src/app/components/games/desert-race/desert-race.component';
import { MayorOMenorComponent } from 'src/app/components/games/mayor-omenor/mayor-omenor.component';
import { PokePreguntadosComponent } from 'src/app/components/games/poke-preguntados/poke-preguntados.component';
import { HomeComponent } from 'src/app/components/home/home.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'mayorOMenor',
    component: MayorOMenorComponent,
    canActivate: [AuthGuard],
  },
  { path: 'ahorcado', component: AhorcadoComponent, canActivate: [AuthGuard] },
  {
    path: 'desertRace',
    component: DesertRaceComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'pokePreguntados',
    component: PokePreguntadosComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GamesRoutingModule {}
