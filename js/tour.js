import Shepherd from 'shepherd.js';

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
        }
    });

    tour.addStep({
        id: 'step1',
        text: 'Welcome to Symmetries!',
        buttons: [{ text: 'Next', action: tour.next }],
    });

    tour.addStep({
        id: 'step2',
        text: 'Here you can see the elements of the symmetric group S4.',
        attachTo: { element: '#sigmatable', on: 'left' },
        buttons: [{ text: 'Next', action: tour.next }],
    });

    return tour;
}

export { make_tour };