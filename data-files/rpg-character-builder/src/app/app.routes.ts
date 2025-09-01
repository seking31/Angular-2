import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PlayersComponent } from './players/players.component';
import { CreateGuildComponent } from './create-guild/create-guild.component';
import { SigninComponent } from './signin/signin.component';
import { CreateCharacterComponent } from './create-character/create-character.component';
import { CharacterFactionComponent } from './character-faction/character-faction.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'players', component: PlayersComponent },
  { path: 'create-guild', component: CreateGuildComponent },
  { path: 'sign-in', component: SigninComponent },
  { path: 'create-character', component: CreateCharacterComponent },
  { path: 'character-faction', component: CharacterFactionComponent },
];
