import { AuthService } from 'shukshma';
import { AuthServiceImpl } from '../auth/AuthService';
import { Container } from 'inversify';
import { IocContainer } from 'shukshma';

let ioc_container:Container = IocContainer.get_ioc_container();


ioc_container.bind<AuthService>(Symbol.for("AuthService")).to(AuthServiceImpl)
