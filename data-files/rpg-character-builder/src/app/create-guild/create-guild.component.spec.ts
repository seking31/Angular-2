import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CreateGuildComponent } from './create-guild.component';

describe('CreateGuildComponent (standalone)', () => {
  let component: CreateGuildComponent;
  let fixture: ComponentFixture<CreateGuildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateGuildComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateGuildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function fillValidForm() {
    component.guildForm.controls['guildName'].setValue('Test');
    component.guildForm.controls['description'].setValue('Test');
    component.guildForm.controls['type'].setValue('Competitive');
    component.guildForm.controls['notificationPreference'].setValue('Email');
    component.guildForm.controls['acceptTerms'].setValue(true);
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid when empty', () => {
    expect(component.guildForm.valid).toBeFalse();
  });

  it('form should be valid when filled correctly', () => {
    fillValidForm();
    expect(component.guildForm.valid).toBeTrue();
  });

  it('should call createGuild on form submit with valid data', () => {
    spyOn(window, 'alert');
    spyOn(component, 'createGuild');
    fillValidForm();
    fixture.detectChanges();

    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', null);

    expect(component.createGuild).toHaveBeenCalled();
  });

  it('should NOT call createGuild on submit when form is invalid', () => {
    spyOn(component, 'createGuild');
    component.guildForm.controls['guildName'].setValue('Partial Guild');
    fixture.detectChanges();

    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', null);

    expect(component.createGuild).not.toHaveBeenCalled();
  });

  it('should add a guild and reset the form on successful submit', () => {
    spyOn(window, 'alert');
    const initialLen = component.createdGuilds.length;

    fillValidForm();
    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', null);
    fixture.detectChanges();

    expect(component.createdGuilds.length).toBe(initialLen + 1);

    const value = component.guildForm.value;
    expect(value.guildName).toBeNull();
    expect(value.description).toBeNull();
    expect(value.type).toBeNull();
    expect(value.notificationPreference).toBeNull();
    expect(value.acceptTerms).toBeFalse();
  });
});
