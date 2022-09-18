import { AnimationController } from '@ionic/angular';
const animationCtrl = new AnimationController();

export const navAnimation = (_: HTMLElement, opts: any) => {
  const rootTransition = animationCtrl
    .create()
    .duration(opts.duration || 333)
    .easing('cubic-bezier(0.1,0,0.3,1)');

  const enterTransition = animationCtrl.create().addElement(opts.enteringEl);
  const exitTransition = animationCtrl.create().addElement(opts.leavingEl);

  enterTransition.fromTo('opacity', '0', '1');
  exitTransition.fromTo('opacity', '1', '0');

  if (opts.direction === 'forward') {
    enterTransition.fromTo('transform', 'translateX(-10%)', 'translateX(0%)');
    exitTransition.fromTo('transform', 'translateX(0%)', 'translateX(10%)');
  } else {
    enterTransition.fromTo('transform', 'translateX(10%)', 'translateX(0%)');
    exitTransition.fromTo('transform', 'translateX(0%)', 'translateX(-10%)');
  }

  rootTransition.addAnimation([enterTransition, exitTransition]);
  return rootTransition;
};
