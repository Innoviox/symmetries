import Shepherd from 'shepherd.js';
import { toggle_enabled } from './utils.js';

function make_tour() {
    const tour = new Shepherd.Tour({
        useModalOverlay: true,
        defaultStepOptions: {
            cancelIcon: {
                enabled: true
            },
            classes: 'shadow-md bg-white',
            scrollTo: true,
            // when: {
            //     show() {
            //         const currentStepElement = tour.currentStep.el;
            //         const footer = currentStepElement.querySelector('.shepherd-footer');
            //         const progress = document.createElement('span');
            //         progress.className = 'shepherd-progress';
            //         progress.innerText = `${tour.steps.indexOf(tour.currentStep) + 1} of ${tour.steps.length}`;
            //         footer.insertBefore(progress, tour.querySelector('.shepherd-button:last-child'));
            //     }
            // }
        },
    });

    tour.addStep({
        id: 'step1',
        text: 'Welcome to Symmetries! Here we are investigating the symmetries of the cube. While you might think this is just permuting the vertices, this leads to twisting the cube, and we only want rotations that preserve the cube\'s structure. Therefore, we must turn to the diagonals.',
        buttons: [{ text: 'Next', action: tour.next }],
    });

    tour.addStep({
        id: 'step2',
        text: 'Here you can see the elements of the symmetric group S4. Click on one (after the tour) to apply it.',
        attachTo: { element: '#sigmatable', on: 'left' },
        buttons: [{ text: 'Next', action: tour.next }],
    });

    tour.addStep({
        id: 'step3',
        text: 'Here you can see the cube in its original state. Click and drag to rotate.',
        attachTo: { element: '#container', on: 'right' },
        buttons: [{ text: 'Next', action: tour.next }],
    });

    tour.addStep({
        id: 'step4',
        text: 'Here you can toggle the cube on and off to see the diagonals.',
        attachTo: { element: '#switch', on: 'left' },
        buttons: [{ text: 'Next', action: tour.next }],
    });

    tour.addStep({
        id: 'step5',
        text: 'Here you can see how each permutation corresponds to a rotation of the cube.',
        attachTo: { element: '#rot-table', on: 'left' },
        buttons: [{ text: 'Next', action: tour.next }],
    });

    tour.addStep({
        id: 'step6',
        text: 'Try different values of σ to see why permuting the diagonals leads to all the symmetries of the cube.',
        buttons: [{ text: 'Next', action: tour.next }],
    });

    tour.on('complete', () => {
        toggle_enabled('sigma');
    });

    tour.on('cancel', () => {
        toggle_enabled('sigma');
    });

    return tour;
}

export { make_tour };