import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';

type GuildType = 'Competitive' | 'Casual' | 'Educational';
type NotificationPreference = 'Email' | 'SMS';

interface Guild {
  guildName: string;
  description: string;
  type: GuildType;
  notificationPreference: NotificationPreference;
}

@Component({
  selector: 'app-create-guild',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  template: `
    <div class="guild-form-container">
      <form [formGroup]="guildForm" class="guild-form" (ngSubmit)="onSubmit()">
        <h1>Create a new guild.</h1>
        <fieldset>
          <legend>Guild Form</legend>

          <label>Guild Name</label>
          <input
            type="text"
            formControlName="guildName"
            placeholder="Enter guild name"
          />
          <div
            class="error"
            *ngIf="
              guildForm.get('guildName')?.touched &&
              guildForm.get('guildName')?.invalid
            "
          >
            <small *ngIf="guildForm.get('guildName')?.errors?.['required']"
              >Guild name is required.</small
            >
            <small *ngIf="guildForm.get('guildName')?.errors?.['maxlength']"
              >Max 100 characters.</small
            >
          </div>

          <label>Description</label>
          <textarea
            rows="6"
            formControlName="description"
            placeholder="Describe your guild..."
          ></textarea>
          <div
            class="error"
            *ngIf="
              guildForm.get('description')?.touched &&
              guildForm.get('description')?.invalid
            "
          >
            <small *ngIf="guildForm.get('description')?.errors?.['required']"
              >Description is required.</small
            >
            <small *ngIf="guildForm.get('description')?.errors?.['maxlength']"
              >Max 1000 characters.</small
            >
          </div>

          <label>Type</label>
          <select formControlName="type">
            <option [value]="null" disabled>Select a type</option>
            @for(t of guildTypes; track t) {
            <option [value]="t">{{ t }}</option>
            }
          </select>
          <div
            class="error"
            *ngIf="
              guildForm.get('type')?.touched && guildForm.get('type')?.invalid
            "
          >
            <small>Type is required.</small>
          </div>

          <label>Notification Preference</label>
          @for(option of notificationOptions; track option) {
          <input
            type="radio"
            [value]="option"
            formControlName="notificationPreference"
          />
          {{ option }} <br />
          }
          <div
            class="error"
            *ngIf="
              guildForm.get('notificationPreference')?.touched &&
              guildForm.get('notificationPreference')?.invalid
            "
          >
            <small>Notification preference is required.</small>
          </div>

          <label class="terms">
            <input type="checkbox" formControlName="acceptTerms" /> I accept the
            terms and conditions
          </label>
          <div
            class="error"
            *ngIf="
              guildForm.get('acceptTerms')?.touched &&
              guildForm.get('acceptTerms')?.invalid
            "
          >
            <small>You must accept the terms.</small>
          </div>

          <input
            type="submit"
            [disabled]="!guildForm.valid"
            value="Create Guild"
          />
        </fieldset>
      </form>

      <div class="guilds">
        <h1>Created Guilds</h1>
        <div class="guilds-container">
          @for(guild of createdGuilds; track guild) {
          <div class="guild-card">
            <h2>{{ guild.guildName }}</h2>
            <h3>Type:</h3>
            <p>{{ guild.type }}</p>
            <h3>Notification Preference:</h3>
            <p>{{ guild.notificationPreference }}</p>
            <h3>Description:</h3>
            <p>{{ guild.description }}</p>
          </div>
          }
        </div>
        <p *ngIf="createdGuilds.length === 0" class="empty">
          Use the form above to create your first guild.
        </p>
      </div>
    </div>
  `,
  styles: [
    `
      .guild-form-container {
        display: flex;
        flex-direction: column;
        width: 80%;
        max-width: 900px;
        margin: 0 auto;
        align-items: center;
      }
      .guild-form,
      .guilds {
        width: 100%;
        margin-bottom: 20px;
      }
      .guilds-container {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
        gap: 20px;
      }
      .guild-card {
        flex: 0 0 calc(50% - 20px);
        box-sizing: border-box;
        border: 1px solid #ccc;
        border-radius: 8px;
        padding: 20px;
        margin: 10px 0;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
      }
      label {
        display: block;
        margin-bottom: 5px;
      }
      label:first-of-type {
        margin-top: 0;
      }
      label:not(:first-of-type) {
        margin-top: 10px;
      }

      select {
        width: 40%;
        display: block;
        margin-bottom: 5px;
        padding: 8px;
        box-sizing: border-box;
      }
      textarea {
        width: 100%;
        margin-bottom: 5px;
        padding: 8px;
        box-sizing: border-box;
      }
      input[type='text'] {
        width: 100%;
        margin-bottom: 5px;
        padding: 8px;
        box-sizing: border-box;
      }

      input[type='submit'] {
        display: block;
        padding: 8px 12px;
        margin-bottom: 10px;
        box-sizing: border-box;
        float: right;
        color: white;
      }

      input[type='checkbox'],
      input[type='radio'] {
        box-sizing: border-box;
        margin-bottom: 10px;
      }

      fieldset {
        margin-bottom: 20px;
      }
      .terms {
        margin-top: 10px;
      }

      .error {
        color: #b91c1c;
        font-size: 0.9rem;
        margin: 4px 0 0 0;
      }
      .empty {
        color: #6b7280;
        font-style: italic;
      }
    `,
  ],
})
export class CreateGuildComponent {
  guildTypes: GuildType[] = ['Competitive', 'Casual', 'Educational'];
  notificationOptions: NotificationPreference[] = ['Email', 'SMS'];
  createdGuilds: Guild[] = [];

  guildForm: FormGroup = this.fb.group({
    guildName: [
      null,
      Validators.compose([Validators.required, Validators.maxLength(100)]),
    ],
    description: [
      null,
      Validators.compose([Validators.required, Validators.maxLength(1000)]),
    ],
    type: [null, Validators.required],
    notificationPreference: [null, Validators.required],
    acceptTerms: [false, Validators.requiredTrue],
  });

  constructor(private fb: FormBuilder) {}

  createGuild() {
    const { acceptTerms, ...value } = this.guildForm.value;
    this.createdGuilds.push(value as Guild);
    console.log('Created guild:', value);
    alert('Guild created');
  }

  onSubmit() {
    if (this.guildForm.invalid) {
      this.guildForm.markAllAsTouched();
      return;
    }
    this.createGuild();
    this.guildForm.reset({
      guildName: null,
      description: null,
      type: null,
      notificationPreference: null,
      acceptTerms: false,
    });
  }
}
