export interface Character {
  name: string;
  gender: 'Male' | 'Female' | 'Other';
  class: 'Warrior' | 'Mage' | 'Rogue';
  faction: string;
  startingLocation: string;
  funFact: string;
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-players',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <h1>Adventurers</h1>
      <p>
        Meet ten heroes from across the realm. Each brings a unique background,
        class, and a fun tidbit from their journeys.
      </p>

      <ul class="players-container">
        @for (c of characters; track c.name) {
        <li class="player-item">
          <div class="card">
            <header class="card__header">
              <h3 class="card__name">{{ c.name }}</h3>
              <span class="card__badge">{{ c.class }}</span>
            </header>

            <dl class="meta">
              <div>
                <dt>Gender</dt>
                <dd>{{ c.gender }}</dd>
              </div>
              <div>
                <dt>Faction</dt>
                <dd>{{ c.faction }}</dd>
              </div>
              <div>
                <dt>Starting Location</dt>
                <dd>{{ c.startingLocation }}</dd>
              </div>
            </dl>

            <p class="fact">💡 {{ c.funFact }}</p>
          </div>
        </li>
        }
      </ul>
    </div>
  `,
  styles: [
    `
      .players-container {
        display: flex;
        flex-wrap: wrap;
        list-style-type: none;
        padding: 0;
        margin: 0 -10px;
      }

      .player-item {
        flex: 0 1 calc(33.33% - 20px);
        margin: 10px;
      }

      .card {
        padding: 16px;
        background: #fff;
        border-radius: 12px;
        border: 1px solid #e5e7eb;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.06);
      }

      .card__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        margin-bottom: 8px;
      }

      .card__name {
        margin: 0;
        font-size: 1.1rem;
        font-weight: 700;
        color: blue;
      }

      .card__badge {
        display: inline-block;
        font-size: 0.75rem;
        padding: 0.25rem 0.5rem;
        border-radius: 999px;
        background: #f3f4f6;
        border: 1px solid #e5e7eb;
        white-space: nowrap;
      }

      .meta {
        margin: 4px 0 8px;
      }
      .meta dt {
        font-size: 0.75rem;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        color: green;
        font-weight: 600;
      }
      .meta dd {
        margin: 0 0 6px 0;
        color: green;
      }

      .fact {
        margin: 6px 0 0 0;
        font-style: italic;
        color: #374151;
        line-height: 1.35;
      }

      /* Responsive: 2 per row on medium, 1 per row on small */
      @media (max-width: 1024px) {
        .player-item {
          flex-basis: calc(50% - 20px);
        }
      }
      @media (max-width: 640px) {
        .player-item {
          flex-basis: 100%;
        }
      }
    `,
  ],
})
export class PlayersComponent {
  characters: Character[];

  constructor() {
    this.characters = [
      {
        name: 'Thorn',
        gender: 'Male',
        class: 'Warrior',
        faction: 'The Brotherhood',
        startingLocation: 'Home',
        funFact: 'defeated a dragon.',
      },
      {
        name: 'Lyra',
        gender: 'Female',
        class: 'Mage',
        faction: 'Pixies',
        startingLocation: 'Beach',
        funFact: 'knows spells',
      },
      {
        name: 'Shade',
        gender: 'Other',
        class: 'Rogue',
        faction: 'The Veil',
        startingLocation: 'Pub',
        funFact: 'Can pick any lock',
      },
      {
        name: 'Brom',
        gender: 'Male',
        class: 'Warrior',
        faction: 'The Veil',
        startingLocation: 'Home',
        funFact: 'Uses a shield',
      },
      {
        name: 'Seraphine',
        gender: 'Female',
        class: 'Mage',
        faction: 'Sunlit Order',
        startingLocation: 'Pub',
        funFact: 'Her familiar is a sentient mote of sunlight.',
      },
      {
        name: 'Vex',
        gender: 'Other',
        class: 'Rogue',
        faction: 'The Vail',
        startingLocation: 'Beach',
        funFact: 'Vex leaves origami foxes at every heist.',
      },
      {
        name: 'Garruk',
        gender: 'Male',
        class: 'Warrior',
        faction: 'Sunlit Order',
        startingLocation: 'Home',
        funFact: 'Garruk arm-wrestled a minotaur and won.',
      },
      {
        name: 'Naida',
        gender: 'Female',
        class: 'Mage',
        faction: 'Pixies',
        startingLocation: 'Beach',
        funFact: 'breathes underwater.',
      },
      {
        name: 'Kite',
        gender: 'Other',
        class: 'Rogue',
        faction: 'Skylark Syndicate',
        startingLocation: 'Pub',
        funFact: 'never touched the ground',
      },
      {
        name: 'Helga',
        gender: 'Female',
        class: 'Warrior',
        faction: 'Vanguard',
        startingLocation: 'Home',
        funFact: 'laughs at battlefield.',
      },
    ];
  }
}
