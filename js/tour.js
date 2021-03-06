import Shepherd from 'shepherd.js';
import { toggle_enabled } from './utils.js';
import { rotation_table_text } from './data.js';

function make_global_tour() {
    const tour = new Shepherd.Tour({
        useModalOverlay: true,
        defaultStepOptions: {
            cancelIcon: {
                enabled: true
            },
            classes: 'shadow-md bg-white',
            scrollTo: true,
            when: {
                show() {
                    const currentStepElement = tour.currentStep.el;
                    const footer = currentStepElement.querySelector('.shepherd-footer');
                    const progress = document.createElement('span');
                    progress.className = 'shepherd-progress';
                    progress.innerText = `${tour.steps.indexOf(tour.currentStep) + 1} of ${tour.steps.length}`;
                    footer.insertBefore(progress, currentStepElement.querySelector('.shepherd-button:last-child'));
                }
            }
        },
    });

    let steps = [new Shepherd.Step(tour, {
        id: 'step1',
        text: 'Welcome to Symmetries! Here we are investigating the symmetries of the cube. While you might think this is just permuting the vertices, this leads to twisting the cube, and we only want rotations that preserve the cube\'s structure. Therefore, we must turn to the diagonals.',
        buttons: [{ text: 'Next', action: tour.next }],
    }),

    new Shepherd.Step(tour, {
        id: 'step2',
        text: 'Here you can see the elements of the symmetric group S4, which has 4! = 24 elements. Click on one (after the tour) to apply it.',
        attachTo: { element: '#sigmatable', on: 'left' },
        buttons: [{ text: 'Next', action: tour.next }],
    }),

    new Shepherd.Step(tour, {
        id: 'step3',
        text: 'Here you can see the cube in its original state. Click and drag to rotate.',
        attachTo: { element: '#container', on: 'right' },
        buttons: [{ text: 'Next', action: tour.next }],
    }),

    new Shepherd.Step(tour, {
        id: 'step4',
        text: 'Here you can toggle the cube on and off to see the diagonals.',
        attachTo: { element: '#switch', on: 'left' },
        buttons: [{ text: 'Next', action: tour.next }],
    }),

    new Shepherd.Step(tour, {
        id: 'step5',
        text: 'Here you can see how each permutation corresponds to a rotation of the cube.',
        attachTo: { element: '#rot-table', on: 'left' },
        buttons: [{ text: 'Next', action: tour.next }],
    }),

    new Shepherd.Step(tour, {
        id: 'step6',
        text: 'Try different values of ?? to see why permuting the diagonals leads to all the symmetries of the cube.',
        buttons: [{ text: 'Next', action: tour.next }],
    })];

    tour.addSteps(steps);

    tour.on('complete', () => {
        toggle_enabled('sigma');
    });

    tour.on('cancel', () => {
        toggle_enabled('sigma');
    });

    return tour;
}

function credits() {
    const tour = new Shepherd.Tour({
        useModalOverlay: true,
        defaultStepOptions: {
            cancelIcon: {
                enabled: true
            },
            classes: 'shadow-md bg-white',
            scrollTo: true,
        },
    });

    tour.addStep({
        id: 'credits-step1',
        text: '<div class="centered-outer"><div class="centered-inner"><h1 class="centered-inner">Symmetries</h1><p class="centered-inner">by Simon Chervenak</p><p class="centered-inner">Made with THREE.js, shepherd.js, and lodash.</p><p class="centered-inner">Source code available on <a href="https://github.com/innoviox/symmetries">GitHub</a>.</p></div></div>',
    });

    tour.start();
}

function rotation_table() {
    const tour = new Shepherd.Tour({
        useModalOverlay: true,
        defaultStepOptions: {
            cancelIcon: {
                enabled: true
            },
            classes: 'shadow-md bg-white',
            scrollTo: true,
        },
    });

    tour.addStep({
        id: 'table-step1',
        text: rotation_table_text
    });

    tour.start();
}

export { make_global_tour, credits, rotation_table };