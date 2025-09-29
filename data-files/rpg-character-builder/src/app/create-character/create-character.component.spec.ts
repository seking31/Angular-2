import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CreateCharacterComponent } from './create-character.component';

describe('CreateCharacterComponent', () => {
  let component: CreateCharacterComponent;
  let fixture: ComponentFixture<CreateCharacterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCharacterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateCharacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should assign sequential integer IDs starting at 1 without decimals', () => {
    const form: any = {
      invalid: false,
      resetForm: jasmine.createSpy('resetForm'),
    };

    component.newCharacter.name = 'Sara';
    component.newCharacter.gender = 'Female';
    component.newCharacter.charClass = 'Rogue';
    component.onSubmit(form);

    expect(component.characters.length).toBe(1);
    expect(component.characters[0].id).toBe(1);
    expect(Number.isInteger(component.characters[0].id)).toBe(true);

    component.newCharacter.name = 'Joe';
    component.newCharacter.gender = 'Male';
    component.newCharacter.charClass = 'Mage';
    component.onSubmit(form);

    expect(component.characters.length).toBe(2);
    expect(component.characters[1].id).toBe(2);
    expect(Number.isInteger(component.characters[1].id)).toBe(true);
  });

  it('should add a character with correct customization', () => {
    const form: any = {
      invalid: false,
      resetForm: jasmine.createSpy('resetForm'),
    };

    component.newCharacter.name = 'Selene';
    component.newCharacter.gender = 'Other';
    component.newCharacter.charClass = 'Warrior';

    component.onSubmit(form);

    const added = component.characters[0];
    expect(added.name).toBe('Selene');
    expect(added.gender).toBe('Other');
    expect(added.charClass).toBe('Warrior');
    expect(added.id).toBe(1);
  });

  it('should reset all form fields to their default values after resetForm is called', () => {
    component.newCharacter.name = 'Temp';
    component.newCharacter.gender = 'Female';
    component.newCharacter.charClass = 'Mage';

    const form: any = {
      invalid: false,
      resetForm: jasmine.createSpy('resetForm'),
    };

    component.resetForm(form);

    expect(form.resetForm).toHaveBeenCalledTimes(1);
    expect(form.resetForm).toHaveBeenCalledWith({
      name: '',
      gender: '',
      charClass: '',
    });

    expect(component.newCharacter.name).toBe('');
    expect(component.newCharacter.gender).toBeUndefined();
    expect(component.newCharacter.charClass).toBeUndefined();
  });

  it('should display the empty message when there are no characters', () => {
    component.characters = [];
    fixture.detectChanges();

    const emptyMsg = fixture.debugElement.query(By.css('.character-list p'));
    expect(emptyMsg).toBeTruthy();
    expect(emptyMsg.nativeElement.textContent).toContain(
      'No characters created yet.'
    );
  });

  it('should render one table row per character after submissions', () => {
    const form: any = {
      invalid: false,
      resetForm: jasmine.createSpy('resetForm'),
    };

    component.newCharacter.name = 'Ava';
    component.newCharacter.gender = 'Female';
    component.newCharacter.charClass = 'Rogue';
    component.onSubmit(form);

    component.newCharacter.name = 'Ben';
    component.newCharacter.gender = 'Male';
    component.newCharacter.charClass = 'Mage';
    component.onSubmit(form);

    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(2);
    expect(rows[0].nativeElement.textContent).toContain('Ava');
    expect(rows[1].nativeElement.textContent).toContain('Ben');
  });

  it('should trim whitespace from the name on submit', () => {
    const form: any = {
      invalid: false,
      resetForm: jasmine.createSpy('resetForm'),
    };

    component.newCharacter.name = '   Ana   ';
    component.newCharacter.gender = 'Female';
    component.newCharacter.charClass = 'Warrior';

    component.onSubmit(form);

    expect(component.characters.length).toBe(1);
    expect(component.characters[0].name).toBe('Ana');
  });
});
