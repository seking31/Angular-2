import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Character {
  id: number;
  name: string;
  gender: 'Male' | 'Female' | 'Other';
  charClass: 'Warrior' | 'Mage' | 'Rogue';
}

@Component({
  selector: 'app-create-character',
  standalone: true,
  imports: [FormsModule], // ✅ No CommonModule needed since we're using @if/@for
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

        @if (characters.length > 0) {
        <table class="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Class</th>
            </tr>
          </thead>
          <tbody>
            @for (ch of characters; track ch.id; let i = $index) {
            <tr>
              <td>{{ i + 1 }}</td>
              <td>
                <strong>{{ ch.name }}</strong>
              </td>
              <td>{{ ch.gender }}</td>
              <td>{{ ch.charClass }}</td>
            </tr>
            }
          </tbody>
        </table>
        } @else {
        <p>No characters created yet.</p>
        }
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
      .table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 10px;
      }
      .table th,
      .table td {
        border-bottom: 1px solid #444;
        text-align: left;
        padding: 8px;
        color: #e0e3f5;
      }
      .table th {
        color: #d49bae;
      }
      .table tr:hover {
        background: #2a2d3e;
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

  onSubmit(form: any) {
    if (form.invalid) return;

    const character: Character = {
      id: this.nextId++,
      name: (this.newCharacter.name || '').trim(),
      gender: this.newCharacter.gender as Character['gender'],
      charClass: this.newCharacter.charClass as Character['charClass'],
    };

    this.characters.push(character);
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
