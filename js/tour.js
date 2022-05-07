import Shepherd from 'shepherd.js';

function make_tour() {
    const tour = new Shepherd.Tour({
        useModalOverlay: true,
        defaultStepOptions: {
            cancelIcon: {
                enabled: true
            },
            classes: 'shadow-md bg-white',
            scrollTo: true
        }
    });

    tour.addStep({
        id: 'example-step',
        text: 'This step is attached to the bottom of the <code>.example-css-selector</code> element.',
        // attachTo: {
        //     element: 'html',
        //     on: 'bottom'
        // },
        // classes: 'example-step-extra-class',
        buttons: [
            {
                text: 'Next',
                action: tour.next
            }
        ],
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
    });

    return tour;
}

export { make_tour };