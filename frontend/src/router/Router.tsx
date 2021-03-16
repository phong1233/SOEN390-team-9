import { Route, Switch } from 'react-router-dom';
import {
  Login,
  Home,
  NotFound,
  Inventory,
  AddItem,
  ItemInfo,
  ForgotPassword,
  ResetPassword,
  Planning,
  AddEvent,
  AddGoal,
  Admin,
  CreateOrder
} from '../pages';
import Guard from './Guard';
import { Container } from '../components';
import { useAuth } from '../contexts/Auth';
import Manufacturing from '../pages/manufacturing/Manufacturing';

export default function Router() {
  const auth = useAuth();

  return (
    <Switch>
      <Guard path="/" allowIf={!auth.isLoggedIn} component={Login} redirect="/home" exact />
      <>
        <Container>
          <Route path="/forgot" component={ForgotPassword} exact />
          <Route path="/reset/:token" component={ResetPassword} exact />
          <Guard path="/home" component={Home} allowIf={auth.isLoggedIn} exact />
          <Guard path="/admin" component={Admin} allowIf={auth.getRole() === 'admin'} exact />

          {/* Inventory */}
          <Guard path="/inventory" component={Inventory} allowIf={auth.isLoggedIn} exact />
          <Guard path="/inventory/add-item" component={AddItem} allowIf={auth.isLoggedIn} exact />
          <Guard
            path="/inventory/item-info/:id"
            component={ItemInfo}
            allowIf={auth.isLoggedIn}
            exact
          />

          {/* Manufacturing */}
          <Guard path="/manufacturing" component={Manufacturing} allowIf={auth.isLoggedIn} exact />
          <Guard
            path="/manufacturing/create-order"
            component={CreateOrder}
            allowIf={auth.isLoggedIn}
            exact
          />
          <Guard
            path="/manufacturing/create-order/:id"
            component={CreateOrder}
            allowIf={auth.isLoggedIn}
            exact
          />

          {/* Planning */}
          <Guard path="/planning" component={Planning} allowIf={auth.isLoggedIn} exact />
          <Guard path="/planning/add-event" component={AddEvent} allowIf={auth.isLoggedIn} exact />
          <Guard path="/planning/add-goal" component={AddGoal} allowIf={auth.isLoggedIn} exact />
        </Container>
      </>
      <Route component={NotFound} />
    </Switch>
  );
}
