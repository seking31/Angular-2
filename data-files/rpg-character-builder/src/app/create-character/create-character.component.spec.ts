import { ComponentFixture, TestBed } from '@angular/core/testing';
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

    // Second character
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
});
