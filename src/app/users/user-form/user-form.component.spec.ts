import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { UserFormComponent } from './user-form.component';

describe('UserFormComponent', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;
  const emptyFormValuesMock = {
    userId: null,
    firstName: '',
    lastName: '',
    email: '',
  };
  const nullFormValuesMock = {
    userId: null,
    firstName: null,
    lastName: null,
    email: null,
  };
  const formValuesMock = {
    userId: 1,
    firstName: 'FirstName Test',
    lastName: 'LastName Test',
    email: 'test@test.com',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [FormBuilder],
      declarations: [UserFormComponent],
      imports: [FormsModule, ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a empty form when init component', () => {
    component.ngOnInit();
    const userFormGroup = component.userForm.value;
    expect(userFormGroup).toEqual(emptyFormValuesMock);
  });

  it('should not change user formgroup information when ngOnChanges is called', () => {
    component.user = undefined;
    component.ngOnChanges();
    const userFormGroup = component.userForm.value;
    expect(userFormGroup).toEqual(emptyFormValuesMock);
  });

  it('should change user formgroup information when ngOnChanges is called', () => {
    component.user = formValuesMock;
    component.ngOnChanges();
    const userFormGroup = component.userForm.value;
    expect(userFormGroup).toEqual(formValuesMock);
  });

  it('should emit event to save user and reset user formgroup', fakeAsync(() => {
    jest.spyOn(component.saveEmitter, 'emit');
    component.userForm.setValue(formValuesMock);
    fixture.detectChanges();
    component.saveUser();

    expect(component.saveEmitter.emit).toHaveBeenCalledWith(formValuesMock);
    tick(300);
    const userFormGroup = component.userForm.value;
    console.log(userFormGroup);
    expect(userFormGroup).toEqual(nullFormValuesMock);
  }));
});
