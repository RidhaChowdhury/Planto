export interface Plant {
    Name: string;
    Id: string;
    DevelopmentStage: string;
    LastWatered?: Date;
};

export interface BeSavedPlantConcern {
    about: 'be-saved-plant';
    plant : Plant;
}

export type BeClosedModelConcern =  { about: 'be-closed' };

export type ModalConcerns = BeSavedPlantConcern | BeClosedModelConcern;