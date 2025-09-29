import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

type GuildType = 'Competitive' | 'Casual' | 'Educational';
type NotificationPreference = 'Email' | 'SMS';

export interface Guild {
  guildName: string;
  description: string;
  type: GuildType;
  notificationPreference: NotificationPreference;
}

@Component({
  selector: 'app-guild-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (guilds.length > 0) {
    <div class="guilds-header">
      <h2>Created Guilds</h2>
      <button type="button" class="btn" (click)="clearAll.emit()">
        Clear All
      </button>
    </div>

    <div class="guilds-container">
      @for (guild of guilds; track guild.guildName) {
      <article class="guild-card">
        <header class="card-header">
          <h3 class="title">{{ guild.guildName }}</h3>
          <button
            type="button"
            class="btn btn-danger"
            (click)="remove.emit(guild.guildName)"
          >
            Remove
          </button>
        </header>

        <div class="grid">
          <div>
            <h4>Type</h4>
            <p>{{ guild.type }}</p>
          </div>
          <div>
            <h4>Notify</h4>
            <p>{{ guild.notificationPreference }}</p>
          </div>
        </div>

        <h4>Description</h4>
        <p class="desc">{{ guild.description }}</p>
      </article>
      }
    </div>
    } @else {
    <p class="empty">Use the form to create your first guild.</p>
    }
  `,
  styles: [
    `
      .guilds-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 8px 0 12px;
        color: black;
      }
      .btn {
        padding: 6px 10px;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        background: #3b82f6;
        color: #fff;
      }
      .btn-danger {
        background: #ef4444;
      }
      .guilds-container {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        color: black;
      }
      .guild-card {
        flex: 0 0 calc(50% - 20px);
        border: 1px solid #ccc;
        border-radius: 8px;
        padding: 16px;
        background: #fff;
      }
      .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;
        color: black;
      }
      .title {
        margin: 0;
        color: black;
      }
      .grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 8px 16px;
      }
      h4 {
        margin: 8px 0 4px;
        color: black;
      }
      .desc {
        margin-top: 0;
      }
      .empty {
        color: #6b7280;
        font-style: italic;
      }
    `,
  ],
})
export class GuildListComponent {
  @Input({ required: true }) guilds!: Guild[];
  @Output() remove = new EventEmitter<string>();
  @Output() clearAll = new EventEmitter<void>();
}
