// create-guild.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CreateGuildComponent } from './create-guild.component';
import { GuildListComponent } from './guild-list.component';

describe('CreateGuildComponent (standalone)', () => {
  let component: CreateGuildComponent;
  let fixture: ComponentFixture<CreateGuildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateGuildComponent], // includes GuildListComponent via parent
    }).compileComponents();

    fixture = TestBed.createComponent(CreateGuildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function fillValidForm() {
    component.guildForm.controls['guildName'].setValue('Test Guild');
    component.guildForm.controls['description'].setValue('A test description');
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
    const createSpy = spyOn(component, 'createGuild').and.callThrough();
    fillValidForm();
    fixture.detectChanges();

    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', null);

    expect(createSpy).toHaveBeenCalled(); // ✅ spy target (not an array)
  });

  it('should NOT call createGuild on submit when form is invalid', () => {
    const createSpy = spyOn(component, 'createGuild');
    component.guildForm.controls['guildName'].setValue('Partial Guild'); // still invalid overall
    fixture.detectChanges();

    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', null);

    expect(createSpy).not.toHaveBeenCalled();
  });

  it('should add a guild and reset the form on successful submit', () => {
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

  // ===== NEW TESTS YOU ASKED FOR =====

  it('should display message for empty list', () => {
    component.createdGuilds = [];
    fixture.detectChanges();

    // Empty message is rendered by the child (GuildListComponent)
    const emptyMsg = fixture.debugElement.nativeElement.querySelector(
      'app-guild-list .empty'
    );
    expect(emptyMsg).toBeTruthy();
    expect(emptyMsg.textContent).toContain(
      'Use the form to create your first guild'
    );
  });

  it('should render a guild card after a valid submit', () => {
    fillValidForm();
    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', null);
    fixture.detectChanges();

    const cards = fixture.debugElement.nativeElement.querySelectorAll(
      'app-guild-list .guild-card'
    );
    expect(cards.length).toBe(1);
    expect(cards[0].textContent).toContain('Test Guild');
  });

  it('should emit guildsChange on successful submit', () => {
    const emitSpy = spyOn(component.guildsChange, 'emit');
    fillValidForm();

    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', null);
    fixture.detectChanges();

    expect(emitSpy).toHaveBeenCalled();
    const payload = emitSpy.calls.mostRecent().args[0] as any[];
    expect(Array.isArray(payload)).toBeTrue();
    expect(payload.length).toBeGreaterThan(0);
    expect(payload[0].guildName).toBe('Test Guild');
  });

  // (Optional) verify clear via child Output:
  it('should clear all guilds when child emits clearAll', () => {
    // seed with one guild
    component.createdGuilds = [
      {
        guildName: 'Seed',
        description: 'Seed',
        type: 'Casual',
        notificationPreference: 'SMS',
      },
    ];
    fixture.detectChanges();

    // find child and emit clearAll
    const childDe = fixture.debugElement.query(
      By.directive(GuildListComponent)
    );
    const child = childDe.componentInstance as GuildListComponent;
    child.clearAll.emit();
    fixture.detectChanges();

    expect(component.createdGuilds.length).toBe(0);
    const emptyMsg = fixture.debugElement.nativeElement.querySelector(
      'app-guild-list .empty'
    );
    expect(emptyMsg).toBeTruthy();
  });
});
