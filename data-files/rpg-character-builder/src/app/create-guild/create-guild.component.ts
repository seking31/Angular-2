import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { GuildListComponent, Guild } from './guild-list.component';

type GuildType = 'Competitive' | 'Casual' | 'Educational';
type NotificationPreference = 'Email' | 'SMS';

@Component({
  selector: 'app-create-guild',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, GuildListComponent],
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
            <small *ngIf="guildForm.get('guildName')?.errors?.['required']">
              Guild name is required.
            </small>
            <small *ngIf="guildForm.get('guildName')?.errors?.['maxlength']">
              Max 100 characters.
            </small>
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
            <small *ngIf="guildForm.get('description')?.errors?.['required']">
              Description is required.
            </small>
            <small *ngIf="guildForm.get('description')?.errors?.['maxlength']">
              Max 1000 characters.
            </small>
          </div>

          <label>Type</label>
          <select formControlName="type">
            <option [value]="null" disabled>Select a type</option>
            @for (t of guildTypes; track t) {
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
          @for (option of notificationOptions; track option) {
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

      <!-- Child display component -->
      <div class="guilds">
        <app-guild-list
          [guilds]="createdGuilds"
          (remove)="removeGuild($event)"
          (clearAll)="clearAllGuilds()"
        >
        </app-guild-list>
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
      label {
        display: block;
        margin-bottom: 5px;
      }
      label:not(:first-of-type) {
        margin-top: 10px;
      }
      select,
      textarea,
      input[type='text'] {
        width: 100%;
        margin-bottom: 5px;
        padding: 8px;
        box-sizing: border-box;
      }
      select {
        width: 40%;
      }
      input[type='submit'] {
        display: block;
        padding: 8px 12px;
        margin-bottom: 10px;
        box-sizing: border-box;
        float: right;
        color: white;
        background: #3b82f6;
        border: none;
        border-radius: 6px;
        cursor: pointer;
      }
      input[type='submit']:disabled {
        background: #93c5fd;
        cursor: not-allowed;
      }
      input[type='checkbox'],
      input[type='radio'] {
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
    `,
  ],
})
export class CreateGuildComponent {
  guildTypes: GuildType[] = ['Competitive', 'Casual', 'Educational'];
  notificationOptions: NotificationPreference[] = ['Email', 'SMS'];
  createdGuilds: Guild[] = [];

  guildForm: FormGroup = this.fb.group({
    guildName: [null, [Validators.required, Validators.maxLength(100)]],
    description: [null, [Validators.required, Validators.maxLength(1000)]],
    type: [null, Validators.required],
    notificationPreference: [null, Validators.required],
    acceptTerms: [false, Validators.requiredTrue],
  });

  @Output() guildsChange = new EventEmitter<Guild[]>();

  constructor(private fb: FormBuilder) {}

  /** New public method for tests */
  public createGuild(newGuild: Guild) {
    this.createdGuilds = [...this.createdGuilds, newGuild];
    this.guildsChange.emit([...this.createdGuilds]);
    alert('Guild created');
  }

  onSubmit() {
    if (this.guildForm.invalid) {
      this.guildForm.markAllAsTouched();
      return;
    }
    const { acceptTerms, ...value } = this.guildForm.value;
    const newGuild = value as Guild;

    this.createGuild(newGuild);

    this.guildForm.reset({
      guildName: null,
      description: null,
      type: null,
      notificationPreference: null,
      acceptTerms: false,
    });
  }

  removeGuild(guildName: string) {
    this.createdGuilds = this.createdGuilds.filter(
      (g) => g.guildName !== guildName
    );
    this.guildsChange.emit([...this.createdGuilds]);
  }

  clearAllGuilds() {
    this.createdGuilds = [];
    this.guildsChange.emit([]);
  }
}
