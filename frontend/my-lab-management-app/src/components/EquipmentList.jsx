import processorImg from '../assets/processor.png';
import cryostatImg from '../assets/cryostat.png';
import histostainerImg from '../assets/histostainer.png';
import microtomeImg from '../assets/microtome.png';
import cytostainerImg from '../assets/cytostainer.png';
import microscopeImg from '../assets/microscope.png';

export const equipment = [
  {
    id: 1,
    name: "Processor",
    department: "histo",
    image: processorImg,
    url: "https://www.leicabiosystems.com/en-nz/histology-equipment/tissue-processors/histocore-peloris-3/",
  },
  {
    id: 2,
    name: "Cryostat",
    department: "histo",
    image: cryostatImg,
    url: "https://www.leicabiosystems.com/en-nz/histology-equipment/cryostats/leica-cm1860/",
  },
  {
    id: 3,
    name: "Histostainer",
    department: "histo",
    image: histostainerImg,
    url: "https://www.leicabiosystems.com/en-nz/histology-equipment/he-slide-stainers-special-stainers-coverslippers/histocore-spectra-workstation/",
  },
  {
    id: 4,
    name: "Microtome",
    department: "histo",
    image: microtomeImg,
    url: "https://www.leicabiosystems.com/en-nz/histology-equipment/microtomes/histocore-biocut/",
  },
  {
    id: 5,
    name: "Cytostainer",
    department: "cyto",
    image: cytostainerImg,
    url: "https://www.leicabiosystems.com/en-nz/histology-equipment/he-slide-stainers-special-stainers-coverslippers/leica-st4020/",
  },
  {
    id: 6,
    name: "Microscope",
    department: "cyto/histo",
    image: microscopeImg,
    url: "https://www.leica-microsystems.com/products/light-microscopes/p/leica-dm3000/",
  },
];
