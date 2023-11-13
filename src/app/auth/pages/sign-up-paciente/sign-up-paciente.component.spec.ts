import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpPacienteComponent } from './sign-up-paciente.component';

describe('SignUpPacienteComponent', () => {
  let component: SignUpPacienteComponent;
  let fixture: ComponentFixture<SignUpPacienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignUpPacienteComponent]
    });
    fixture = TestBed.createComponent(SignUpPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
