import { Component, Input } from '@angular/core';
import type { Character } from '../create-character/create-character.component';

@Component({
  selector: 'app-character-list',
  standalone: true,
  template: `
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
  `,
  styles: [
    `
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
      p {
        color: #e0e3f5;
        margin-top: 6px;
      }
    `,
  ],
})
export class CharacterListComponent {
  @Input({ required: true }) characters: Character[] = [];
}
