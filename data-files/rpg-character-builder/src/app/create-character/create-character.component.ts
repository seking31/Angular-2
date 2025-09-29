import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CharacterListComponent } from './character-list.component';

export interface Character {
  id: number;
  name: string;
  gender: 'Male' | 'Female' | 'Other';
  charClass: 'Warrior' | 'Mage' | 'Rogue';
}

@Component({
  selector: 'app-create-character',
  standalone: true,
  imports: [FormsModule, CharacterListComponent],
  template: `
    <div class="character-form-container">
      <form
        #charForm="ngForm"
        (ngSubmit)="onSubmit(charForm)"
        class="character-form"
      >
        <fieldset>
          <legend>Create Character</legend>

          <!-- Name -->
          <label for="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            class="text-input"
            [(ngModel)]="newCharacter.name"
            required
            #nameCtrl="ngModel"
          />
          @if (nameCtrl.invalid && (nameCtrl.dirty || nameCtrl.touched)) {
          <div class="error">Name is required.</div>
          }

          <!-- Gender -->
          <label for="gender">Gender</label>
          <select
            id="gender"
            name="gender"
            [(ngModel)]="newCharacter.gender"
            required
            #genderCtrl="ngModel"
          >
            <option value="" disabled [selected]="!newCharacter.gender">
              Select gender
            </option>
            @for (g of genders; track g) {
            <option [value]="g">{{ g }}</option>
            }
          </select>
          @if (genderCtrl.invalid && (genderCtrl.dirty || genderCtrl.touched)) {
          <div class="error">Gender is required.</div>
          }

          <!-- Class -->
          <label for="charClass">Class</label>
          <select
            id="charClass"
            name="charClass"
            [(ngModel)]="newCharacter.charClass"
            required
            #classCtrl="ngModel"
          >
            <option value="" disabled [selected]="!newCharacter.charClass">
              Select class
            </option>
            @for (c of classes; track c) {
            <option [value]="c">{{ c }}</option>
            }
          </select>
          @if (classCtrl.invalid && (classCtrl.dirty || classCtrl.touched)) {
          <div class="error">Class is required.</div>
          }

          <input
            type="submit"
            value="Add Character"
            [disabled]="charForm.invalid"
          />
        </fieldset>
      </form>

      <section class="character-list">
        <h1>Characters</h1>
        <app-character-list [characters]="characters"></app-character-list>
      </section>
    </div>
  `,
  styles: [
    `
      .character-form-container {
        display: flex;
        justify-content: space-between;
        gap: 12px;
        align-items: flex-start;
      }
      .character-form {
        flex: 1;
        margin-right: 20px;
      }
      .character-list {
        flex: 1;
      }
      fieldset {
        margin-bottom: 20px;
        border: 1px solid #444;
        padding: 15px;
        border-radius: 10px;
        background: #1f2230;
      }
      legend {
        font-weight: bold;
        color: #678cec;
      }
      label,
      .text-input,
      select {
        display: block;
        margin-bottom: 6px;
        font-family: Arial, sans-serif;
        color: #ddd;
      }
      .text-input,
      select,
      input[type='submit'] {
        padding: 8px;
        box-sizing: border-box;
        border-radius: 6px;
        border: 1px solid #666;
        background: #2a2d3e;
        color: #e0e3f5;
      }
      select,
      .text-input {
        width: 100%;
      }
      input[type='submit'] {
        float: right;
        background: #678cec;
        color: white;
        font-weight: bold;
        cursor: pointer;
        border: none;
      }
      input[type='submit']:disabled {
        background: #555;
        cursor: not-allowed;
      }
      .error {
        color: #ff6b6b;
        font-size: 0.85rem;
        margin-top: -2px;
        margin-bottom: 8px;
      }
    `,
  ],
})
export class CreateCharacterComponent {
  genders: Array<Character['gender']> = ['Male', 'Female', 'Other'];
  classes: Array<Character['charClass']> = ['Warrior', 'Mage', 'Rogue'];

  characters: Character[] = [];

  newCharacter: Partial<Character> = {
    name: '',
    gender: undefined,
    charClass: undefined,
  };

  private nextId = 1;

  /** Emits the full list whenever it changes */
  @Output() charactersChange = new EventEmitter<Character[]>();

  onSubmit(form: any) {
    if (form.invalid) return;

    const character: Character = {
      id: this.nextId++,
      name: (this.newCharacter.name || '').trim(),
      gender: this.newCharacter.gender as Character['gender'],
      charClass: this.newCharacter.charClass as Character['charClass'],
    };

    // Update state immutably for easier change detection
    this.characters = [...this.characters, character];

    // Emit the updated list to any parent that’s listening
    this.charactersChange.emit([...this.characters]);

    this.resetForm(form);
  }

  resetForm(form: any) {
    form.resetForm({
      name: '',
      gender: '',
      charClass: '',
    });
    this.newCharacter = { name: '', gender: undefined, charClass: undefined };
  }
}
