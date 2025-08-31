import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  template: `
    <div>
      <h1>RPG Character Builder</h1>
      <h2>Forge your heroes, villains, and legends with ease!</h2>
      <p>
        Welcome to the RPG Character Builder, your ultimate hub for creating
        memorable characters for your tabletop adventures. Whether you are a
        seasoned dungeon master preparing for your next campaign or a brand-new
        adventurer taking your first steps into a fantasy world, this tool
        streamlines the process so you can spend less time on spreadsheets and
        more time telling stories.
      </p>
      <p>
        Our builder gives you the freedom to customize every detail of your
        character: choose a race, explore diverse classes, tweak your stats,
        pick unique abilities, and craft a backstory that makes your hero feel
        alive. We focus on simplicity and creativity, ensuring that the rules
        help guide you without ever limiting your imagination. The result is a
        character sheet that feels like your own—clear, playable, and inspiring.
      </p>
      <p>
        RPGs are about collaboration, laughter, and unforgettable adventures.
        That’s why our builder makes it easy to share your characters with your
        party, export them for quick reference, or print them out for in-person
        play. No matter your playstyle, our goal is to keep your creative spark
        burning bright while giving you the tools to bring your vision to life.
      </p>
      <p>
        Whether you dream of playing a cunning rogue, a fearless warrior, or a
        pacifist cleric who heals with a smile, the RPG Character Builder is
        here to help you craft the story only you can tell. Adventure awaits—
        and it starts with the character you bring to the table.
      </p>

      <div class="highlights-container">
        <div class="highlight">
          <img
            src="/hero.jpg"
            alt="Illustration of a fantasy hero holding a sword"
          />
          <p>
            Every campaign begins with a hero. Design a character who reflects
            your imagination and your playstyle. From noble paladins to chaotic
            tricksters, your choices define the story.
          </p>
        </div>
        <div class="highlight">
          <img src="/spellbook.jpg" alt="Open spellbook with glowing runes" />
          <p>
            Magic, combat, stealth—the path is yours to choose. With hundreds of
            possibilities, you can tailor spells, abilities, and skills to make
            your character truly unique.
          </p>
        </div>
        <div class="highlight">
          <img
            src="/party.jpg"
            alt="Adventuring party gathered around a campfire"
          />
          <p>
            Role-playing is best with friends. Share your creations, inspire
            your party, and dive into adventures that will be remembered long
            after the dice stop rolling.
          </p>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .highlights-container {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        flex-wrap: wrap;
        gap: 20px;
        margin-top: 20px;
      }
      .highlight {
        text-align: center;
        flex: 0 1 calc(33.333% - 20px);
        box-sizing: border-box;
        background: #1f2230;
        border: 1px solid #444;
        padding: 15px;
        border-radius: 10px;
      }
      .highlight img {
        max-width: 100%;
        height: auto;
        object-fit: cover;
        border-radius: 6px;
      }
      .highlight p {
        margin-top: 10px;
        font-size: 0.95rem;
        line-height: 1.5;
        color: #e0e3f5;
      }
      h1 {
        font-family: 'Georgia', serif;
        color: #678cec;
        margin-bottom: 0.5rem;
      }
      h2 {
        font-family: 'Trebuchet MS', sans-serif;
        color: #d49bae;
        margin-top: 0;
      }
      p {
        font-family: Arial, sans-serif;
        color: #ddd;
      }
    `,
  ],
})
export class HomeComponent {}
