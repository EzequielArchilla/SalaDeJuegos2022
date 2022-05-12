import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GamesRoutingModule } from './games-routing.module';
import { GamesComponent } from './games.component';
import { DesertRaceComponent } from 'src/app/components/games/desert-race/desert-race.component';
import { PokePreguntadosComponent } from 'src/app/components/games/poke-preguntados/poke-preguntados.component';
import { MayorOMenorComponent } from 'src/app/components/games/mayor-omenor/mayor-omenor.component';
import { AhorcadoComponent } from 'src/app/components/games/ahorcado/ahorcado.component';

@NgModule({
  declarations: [
    GamesComponent,
    AhorcadoComponent,
    MayorOMenorComponent,
    DesertRaceComponent,
    PokePreguntadosComponent,
  ],
  imports: [CommonModule, GamesRoutingModule],
})
export class GamesModule {}
