import numpy as np
import matplotlib.pyplot as plt
import pathlib

p = pathlib.Path(__file__).parent.absolute()
p2 = p.parent / "front" / "public" / "pictures"
# p2.clear()  # clear the folder


def graph(country_name="nothing_received"):
    X = np.linspace(0, 2 * np.pi, 100)
    F = np.sin(X)
    plt.plot(X, F)
    plt.title(f"{country_name}")
    plt.savefig(p2 / f"{country_name}.png")
    plt.close()
